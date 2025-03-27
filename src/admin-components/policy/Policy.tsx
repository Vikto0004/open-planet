"use client";

import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import isEqual from "lodash.isequal";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import Editor from "@/admin-components/editor/editor";
import { useGetPolicy, useUpdatePolicy } from "@/admin-shared/hooks";
import { IPolicyInfo } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { policySchema } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import Tabs from "@/admin-widgets/tabs/Tabs";
import { LangType } from "@/i18n/routing";

const Policy = () => {
  const [lang, setLang] = useState<LangType>("ua");
  const updatePolicy = useUpdatePolicy();
  const { data } = useGetPolicy();

  const { handleSubmit, setValue, watch, reset } = useForm<
    Yup.InferType<typeof policySchema>
  >({
    defaultValues: {
      ua: data?.ua || { title: "", blocks: [] },
      en: data?.en || { title: "", blocks: [] },
    },
  });

  const observer = watch();
  const memoizedIsShouldSave = useMemo(
    () => isEqual(data, observer),
    [observer, data],
  );

  useEffect(() => {
    reset({
      ua: data?.ua || { title: "", blocks: [] },
      en: data?.en || { title: "", blocks: [] },
    });
  }, [data, reset]);

  const onSubmit = (data: Yup.InferType<typeof policySchema>) => {
    updatePolicy.mutate({ req: data });
    console.log("Форма відправлена:", data);
  };

  return (
    <>
      {data && (
        <Box sx={{ position: "relative" }}>
          <Tabs
            lang={lang}
            setLang={(newLang: LangType) => {
              setLang(newLang);
            }}
            shouldSave={memoizedIsShouldSave}
          />
          <Box sx={{ width: "100wh", height: "48px" }}></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              ml: "15px",
            }}
          >
            <TextField
              label="Title"
              value={observer[lang].title}
              onChange={(e) => setValue(`${lang}.title`, e.target.value)}
              sx={{ width: "30%" }}
              margin="normal"
            />

            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{
                height: "56px",
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Зберегти
            </Button>
          </Box>

          <Editor
            data={observer[lang].blocks ?? []}
            onSave={(newData) =>
              setValue(`${lang}.blocks`, newData as IPolicyInfo[])
            }
          />
        </Box>
      )}
    </>
  );
};

export default Policy;
