"use client";

import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import isEqual from "lodash.isequal";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import PolicyDetails from "@/admin-components/policyDetails/PolicyDetails";
import {
  useCreatePolicyBlock,
  useDeletePolicyBlock,
  useGetPolicy,
  useUpdatePolicy,
} from "@/admin-shared/hooks";
import { IPolicyInfo } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { PolicyFormValues } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import Tabs from "@/admin-widgets/tabs/Tabs";
import { LangType } from "@/i18n/routing";

import ToolBar from "../toolBar/ToolBar";

const PublicOffer = () => {
  const [lang, setLang] = useState<LangType>("ua"); // check lang
  const [selectedMainBlockId, setSelectedMainBlockId] = useState<string | null>(
    null,
  ); // main block id
  const [isAdding, setIsAdding] = useState(false); // disabled textarea
  const [tagName, setTagName] = useState("p"); // tag name
  const updatePolicy = useUpdatePolicy();
  const { data } = useGetPolicy();
  const createPolicyBlockId = useCreatePolicyBlock();
  const deleteBlock = useDeletePolicyBlock();

  const { handleSubmit, setValue, watch, reset } = useForm<PolicyFormValues>({
    defaultValues: {
      type: data?.type || undefined,
      ua: data?.ua || { title: "", blocks: [] },
      en: data?.en || { title: "", blocks: [] },
    },
  });

  const observer = watch();

  const blocks = useMemo(() => observer[lang].blocks, [observer, lang]);

  const memoizedIsShouldSave = useMemo(
    () => !isEqual(data, observer),
    [observer, data],
  );

  useEffect(() => {
    reset({
      type: data?.type || undefined,
      ua: data?.ua || { title: "", blocks: [] },
      en: data?.en || { title: "", blocks: [] },
    });
  }, [data, reset]);

  const addNewPolicyBlock = async () => {
    try {
      const result = await createPolicyBlockId.mutateAsync({
        blockId: "",
        type: observer.type,
      });

      if (!result.blockId) {
        throw new Error("blockId не отримано від сервера");
      }

      const newBlock: IPolicyInfo = {
        id: result.blockId,
        tag: "section",
        className: "editor-block",
        children: [],
      };
      console.log("newBlock " + JSON.stringify(newBlock, null, 2));
      const updatedBlocks = [...blocks, newBlock];

      console.log("updatedBlocks " + JSON.stringify(updatedBlocks, null, 2));
      setValue(`${lang}.blocks`, updatedBlocks);
    } catch (error) {
      console.error("❌ Помилка при додаванні нового блоку:", error);
    }
  };

  const deletePolicyBlock = async (index: number) => {
    const currentBlocks = watch()[lang].blocks;
    const blockToDelete = currentBlocks[index];

    try {
      await deleteBlock.mutateAsync({
        blockId: blockToDelete.id,
        type: observer.type,
      });

      const updatedBlocks = currentBlocks.filter((_, i) => i !== index);
      setValue(`${lang}.blocks`, updatedBlocks);
    } catch (error) {
      console.error("❌ Не вдалося видалити блок:", error);
    }
  };

  const onSubmit = async (formData: PolicyFormValues) => {
    try {
      await updatePolicy.mutateAsync({ req: formData });
    } catch (error) {
      console.error("❌ Помилка при оновленні політики:", error);
    }
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
            <TextField
              label="Subtitle"
              value={observer[lang].subtitle}
              onChange={(e) => setValue(`${lang}.subtitle`, e.target.value)}
              sx={{ width: "30%" }}
              margin="normal"
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={!memoizedIsShouldSave}
              sx={{
                height: "56px",
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Зберегти
            </Button>
            <Button
              onClick={() => {
                console.log(observer);
                console.log("mainid: " + selectedMainBlockId);
              }}
              sx={{
                height: "56px",
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Show
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "15px",
              ml: "15px",
            }}
          >
            <ToolBar
              setIsAdding={setIsAdding}
              setValue={setValue}
              lang={lang}
              watch={watch}
              selectedMainBlockId={selectedMainBlockId}
              setTagName={setTagName}
              type={observer.type}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "15px",
                ml: "210px",
                width: "calc(100% - 210px)",
              }}
            >
              {blocks.map((block, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "flex-end",
                    padding: "0px 15px",
                    gap: "3px",
                  }}
                >
                  <PolicyDetails
                    key={block.id}
                    block={block}
                    lang={lang}
                    index={index}
                    setValue={setValue}
                    watch={watch}
                    selectedMainBlockId={selectedMainBlockId}
                    setSelectedMainBlockId={setSelectedMainBlockId}
                    isAdding={isAdding}
                    setIsAdding={setIsAdding}
                    tagName={tagName}
                    type={observer.type}
                  />
                  <Button
                    onClick={() => {
                      deletePolicyBlock(index);
                    }}
                    sx={{
                      height: "auto",
                      backgroundColor: "red",
                      color: "white",
                      "&:hover": { backgroundColor: "darkred" },
                    }}
                  >
                    Видалити блок
                  </Button>
                </Box>
              ))}
              <Button
                onClick={addNewPolicyBlock}
                sx={{
                  height: "56px",
                  backgroundColor: "green",
                  color: "white",
                  "&:hover": { backgroundColor: "darkgreen" },
                }}
              >
                Створити блок
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PublicOffer;
