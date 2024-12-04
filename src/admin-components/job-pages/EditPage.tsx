import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import isEqual from "lodash.isequal";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { isWorkDirectionsValid } from "@/admin-shared/lib/checkFormIsValid";
import { allowedTypes } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { editFormSchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import EditForm from "@/admin-widgets/forms/editForm/EditForm";
import Tabs from "@/admin-widgets/tabs/Tabs";
import SidebarTools from "@/admin-widgets/work-direction/sidebarTools/SidebarTools";
import { LangType } from "@/i18n/routing";

const EditPage = ({ data }: { data: Yup.InferType<typeof editFormSchema> }) => {
  const [lang, setLang] = useState<LangType>("ua");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<Yup.InferType<typeof editFormSchema>>({
    defaultValues: data,
    resolver: yupResolver(editFormSchema),
  });
  const observer = watch();
  const memoizedIsWorkDirectionsValid = useMemo(
    () => isWorkDirectionsValid(data),
    [data],
  );

  const memoizedIsShouldSave = useMemo(
    () => isEqual(data, observer),
    [observer, data],
  );
  useEffect(() => {
    reset(data);
  }, [data, reset]);

  return (
    <>
      {data && (
        <Box sx={{ position: "relative" }}>
          <Tabs
            lang={lang}
            setLang={setLang}
            shouldSave={!memoizedIsShouldSave}
          ></Tabs>
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
                ...data[lang],
                workDirectionsType: data.workDirectionsType as allowedTypes[],
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
