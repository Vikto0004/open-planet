import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { isWorkDirectionsValid } from "@/admin-shared/lib/checkFormIsValid";
import {
  allowedTypes,
  IWorkDirectionCard,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import EditForm from "@/admin-widgets/forms/editForm/EditForm";
import Tabs from "@/admin-widgets/tabs/Tabs";
import SidebarTools from "@/admin-widgets/work-direction/sidebarTools/SidebarTools";
import { LangType } from "@/i18n/routing";

const normalizeSectionAmount = (sections: any[] = []) => {
  return sections.map((section) => ({
    ...section,
    amount:
      typeof section.amount === "number"
        ? section.amount.toString()
        : section.amount,
    content: section.content || [],
  }));
};

const normalizeFormData = (data: IWorkDirectionCard) => ({
  ua: {
    ...data.ua,
    cardTitle: data.ua?.cardTitle || "",
    mainImg: data.ua?.mainImg || "",
    sections: normalizeSectionAmount(data.ua?.sections),
  },
  en: {
    ...data.en,
    cardTitle: data.en?.cardTitle || "",
    mainImg: data.en?.mainImg || "",
    sections: normalizeSectionAmount(data.en?.sections),
  },
  workDirectionsType: data.workDirectionsType || [],
  projectId: data._id,
});

const EditPage = ({ data }: { data: IWorkDirectionCard }) => {
  const [lang, setLang] = useState<LangType>("ua");

  const normalizedData = useMemo(() => normalizeFormData(data), [data]);

  const { handleSubmit, setValue, reset, watch } = useForm<
    Yup.InferType<typeof editFormSchema>
  >({
    defaultValues: normalizedData,
  });

  useEffect(() => {
    reset(normalizedData);
  }, [lang, normalizedData, reset]);

  const formValues = watch();

  const isPostable = useMemo(() => isWorkDirectionsValid(data), [data]);

  return (
    <>
      {data && (
        <Box sx={{ position: "relative" }}>
          <Tabs
            lang={lang}
            setLang={(newLang: LangType) => {
              setLang(newLang);
            }}
            shouldSave={false}
          />
          <Box sx={{ width: "100wh", height: "48px" }}></Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "180px",
                height: "100vh",
                position: "relative",
                padding: "20px",
              }}
            >
              <SidebarTools
                isPostable={isPostable}
                shouldSave={false}
                id={data._id}
              />
            </Box>
            <Divider orientation="vertical" sx={{ height: "100vh" }} />

            <EditForm
              data={{
                cardTitle: formValues[lang]?.cardTitle || "",
                mainImg: formValues[lang]?.mainImg || "",
                sections: formValues[lang]?.sections || [
                  {
                    id: "default",
                    sectionType: "paragraph",
                    content: [],
                    amount: "0",
                  },
                ],
                workDirectionsType:
                  formValues.workDirectionsType as allowedTypes[],
              }}
              handleSubmit={handleSubmit}
              setValue={setValue}
              projectId={data._id}
              lang={lang}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditPage;
