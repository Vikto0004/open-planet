import { SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import {
  UseFormHandleSubmit,
  SubmitHandler,
  UseFormSetValue,
} from "react-hook-form";
import * as Yup from "yup";

import { useUpdateDirection, useCreateImages } from "@/admin-shared/hooks";
import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";

import css from "../forms.module.css";

import AddFieldForm from "./AddFieldForm";
import SectionRenderer from "./EditFormFieldComponents/SectionRenderer";

const normalizeSections = (
  sections: { id: string; sectionType: string; content: any }[],
) => {
  return sections.map((section) => ({
    ...section,
    content:
      section.sectionType === "paragraph"
        ? Array.isArray(section.content)
          ? section.content
          : section.content
            ? [section.content]
            : []
        : section.content,
  }));
};

const EditForm = ({
  data: editData,
  handleSubmit,
  setValue,
  lang,
  projectId,
}: {
  data: Yup.InferType<typeof editFormSchema>["en" | "ua"] & {
    workDirectionsType: allowedTypes[];
    sections?: { id: string; sectionType: string; content: any }[];
  };
  handleSubmit: UseFormHandleSubmit<Yup.InferType<typeof editFormSchema>>;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  lang: string;
  projectId: string;
}) => {
  const { mutate: updateDirection } = useUpdateDirection();
  const { mutateAsync: uploadImage } = useCreateImages();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const normalizedData = {
    ...editData,
    sections: editData.sections ? normalizeSections(editData.sections) : [],
  };

  const onSubmit: SubmitHandler<Yup.InferType<typeof editFormSchema>> = async (
    data,
  ) => {
    console.log("Перед сабмітом:", data);

    let imageUrl = data.mainImg;

    // Завантаження зображення, якщо вибрано нове
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await uploadImage({ id: projectId, formData });
        if (response?.url) {
          imageUrl = response.url;
        }
      } catch (error) {
        console.error("Помилка завантаження зображення:", error);
      }
    }

    const fixedData: any = {
      workDirectionsType: Array.isArray(data.workDirectionsType)
        ? data.workDirectionsType
        : [data.workDirectionsType],
      mainImg: imageUrl,
      projectId,
    };

    // Додавання даних для поточної мови (ua або en)
    if (lang === "ua") {
      fixedData.ua = {
        ...data.ua,
        sections:
          data.ua?.sections?.map((section) => ({
            ...section,
            content:
              section.sectionType === "paragraph"
                ? Array.isArray(section.content)
                  ? section.content
                  : section.content !== undefined && section.content !== null
                    ? [section.content]
                    : []
                : section.content,
          })) || [],
      };
    } else if (lang === "en") {
      fixedData.en = {
        ...data.en,
        sections:
          data.en?.sections?.map((section) => ({
            ...section,
            content:
              section.sectionType === "paragraph"
                ? Array.isArray(section.content)
                  ? section.content
                  : section.content !== undefined && section.content !== null
                    ? [section.content]
                    : []
                : section.content,
          })) || [],
      };
    }

    console.log("Перед відправкою:", fixedData);
    updateDirection({ projectId, data: fixedData });
  };

  return (
    <Box sx={{ padding: "10px", width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.editFormWrapper}>
          <AddFieldForm
            editData={normalizedData}
            setValue={setValue}
            lang={lang}
            onFileChange={(event) => {
              if (event.target.files && event.target.files.length > 0) {
                setSelectedFile(event.target.files[0]);
              }
            }}
            selectedFile={selectedFile}
            onChangeTypes={(event: SelectChangeEvent<string | string[]>) => {
              const { value } = event.target;
              const newValue = Array.isArray(value) ? value : [value];
              setValue("workDirectionsType", newValue as allowedTypes[]);
            }}
          />

          <Divider className={css.label} textAlign="center">
            Секції
          </Divider>

          {/* Рендеринг секцій тільки для поточної мови */}
          {normalizedData.sections?.map((section, index) => (
            <SectionRenderer
              key={section.id}
              section={section}
              index={index}
              projectId={projectId}
              setValue={setValue}
              lang={lang}
            />
          ))}

          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              width: 100,
              backgroundColor: "red",
              color: "white",
              "&:hover": {
                backgroundColor: "darkred",
              },
            }}
            type="submit"
          >
            Зберегти
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditForm;
