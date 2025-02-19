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
import { LangType } from "@/i18n/routing";

import css from "../forms.module.css";

import AddFieldForm from "./AddFieldForm";
import SectionRenderer from "./EditFormFieldComponents/SectionRenderer"; // Import SectionRenderer

const EditForm = ({
  data: editData,
  handleSubmit,
  setValue,
  lang,
  projectId,
}: {
  data: Yup.InferType<typeof editFormSchema>["en" | "ua"] & {
    workDirectionsType: allowedTypes[];
  };
  handleSubmit: UseFormHandleSubmit<Yup.InferType<typeof editFormSchema>>;
  setValue: UseFormSetValue<Yup.InferType<typeof editFormSchema>>;
  lang: string;
  projectId: string;
}) => {
  const { mutate: updateDirection } = useUpdateDirection();
  const { mutateAsync: uploadImage } = useCreateImages();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit: SubmitHandler<Yup.InferType<typeof editFormSchema>> = async (
    data,
  ) => {
    console.log("Відправлені дані:", data);

    let imageUrl = data.mainImg;

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

    updateDirection({ ...data, projectId, mainImg: imageUrl });
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChangeTypes = (
    event: SelectChangeEvent<typeof editData.workDirectionsType>,
  ) => {
    const {
      target: { value },
    } = event;
    setValue(
      "workDirectionsType",
      typeof value === "string" ? value.split(",") : value,
    );
  };

  return (
    <Box sx={{ padding: "10px", width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.editFormWrapper}>
          <AddFieldForm
            editData={editData}
            setValue={setValue}
            lang={lang}
            onFileChange={onFileChange}
            selectedFile={selectedFile}
            onChangeTypes={onChangeTypes}
          />

          <Divider className={css.label} textAlign="center">
            Секції
          </Divider>

          {editData?.sections?.map((section, index) => (
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
            sx={{ textTransform: "none", width: 100 }}
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
