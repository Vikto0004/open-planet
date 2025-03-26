import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import isEqual from "lodash.isequal";
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

const EditPage = ({ data }: { data: IWorkDirectionCard }) => {
  const [lang, setLang] = useState<LangType>("ua");

  // Використовуємо useForm з ініціалізацією дефолтних значень
  const { handleSubmit, setValue, watch, reset } = useForm<
    Yup.InferType<typeof editFormSchema>
  >({
    defaultValues: {
      ua: data.ua || {
        cardTitle: "",
        mainImg: "",
        sections: [{ id: "default", sectionType: "paragraph", content: [] }],
      },
      en: data.en || {
        cardTitle: "",
        mainImg: "",
        sections: [{ id: "default", sectionType: "paragraph", content: [] }],
      },
      workDirectionsType: data.workDirectionsType || [],
    },
  });

  const observer = watch();

  // Мемоізовані значення
  const memoizedIsWorkDirectionsValid = useMemo(() => {
    return isWorkDirectionsValid(data);
  }, [data]);

  const memoizedIsShouldSave = useMemo(
    () => !isEqual(data, observer),
    [observer, data],
  );

  // Скидання значень при зміні даних
  useEffect(() => {
    reset((prevValues) => ({
      ...prevValues,
      ua: data.ua || prevValues.ua,
      en: data.en || prevValues.en,
      workDirectionsType:
        data.workDirectionsType || prevValues.workDirectionsType,
    }));
  }, [data, reset]);

  return (
    <>
      {data && (
        <Box sx={{ position: "relative" }}>
          <Tabs
            lang={lang}
            setLang={(newLang: LangType) => {
              // Зберігаємо поточні дані мови перед зміною
              const currentData = observer[lang] || {
                cardTitle: "",
                mainImg: "",
                sections: [
                  { id: "default", sectionType: "paragraph", content: [] },
                ],
              };
              setValue(lang, currentData);
              setLang(newLang);
            }}
            shouldSave={!memoizedIsShouldSave}
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
                isPostable={memoizedIsWorkDirectionsValid}
                shouldSave={!memoizedIsShouldSave}
                id={data._id}
              />
            </Box>
            <Divider orientation="vertical" sx={{ height: "100vh" }} />

            <EditForm
              data={{
                cardTitle: observer[lang]?.cardTitle || "",
                mainImg: observer[lang]?.mainImg || "",
                sections: observer[lang]?.sections || [
                  { id: "default", sectionType: "paragraph", content: [] },
                ],
                workDirectionsType:
                  observer.workDirectionsType as allowedTypes[],
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
