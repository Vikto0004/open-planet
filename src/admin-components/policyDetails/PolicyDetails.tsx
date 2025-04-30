"use client";

import React, { useState } from "react";
import "@/app/[lang]/globals.css";
import { Path, UseFormSetValue, UseFormWatch } from "react-hook-form";

import {
  IPolicyInfo,
  polycyType,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { PolicyFormValues } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import { LangType } from "@/i18n/routing";

import TextareaC from "../policy/TextareaC";
import { createNewChildNodeBlock } from "../policy/utils";
import Renderer from "../renderer/Renderer";

import styles from "./policyDetails.module.css";

interface PolicyDetailsProps {
  block: IPolicyInfo;
  lang: LangType;
  index: number;
  setValue: UseFormSetValue<PolicyFormValues>;
  watch: UseFormWatch<PolicyFormValues>;
  setSelectedMainBlockId: (index: string) => void;
  selectedMainBlockId: string | null;
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  tagName: string;
  type: polycyType;
}

const PolicyDetails: React.FC<PolicyDetailsProps> = ({
  block,
  lang,
  index,
  setValue,
  watch,
  setSelectedMainBlockId,
  selectedMainBlockId,
  isAdding,
  setIsAdding,
  tagName,
  type,
}) => {
  const [newContent, setNewContent] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("");

  const saveContent = async () => {
    if (newContent.trim() === "") return;

    const blocks: IPolicyInfo[] = watch(`${lang}.blocks`) || []; // ua/en

    const updatedBlocks = await createNewChildNodeBlock(
      selectedBlockId ? selectedBlockId : selectedMainBlockId,
      tagName,
      newContent,
      blocks[index].children,
      type,
      selectedMainBlockId,
    );
    const path = `${lang}.blocks[${index}].children` as Path<PolicyFormValues>;
    setValue(path, updatedBlocks);

    setNewContent(""); // Очистити поле
    setIsAdding(false); // Закрити textarea
  };

  const handleMainBlockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMainBlockId(block.id);
    setSelectedBlockId(null);
    setNewContent("");
    setIsAdding(false);
  };

  return (
    <div className={styles.editor} onClick={handleMainBlockClick}>
      <div className={styles.container}>
        {block.children.map((item, index) => (
          <Renderer
            node={item}
            key={index}
            setValue={setValue}
            lang={lang}
            watch={watch}
            setSelectedBlockId={setSelectedBlockId}
            selectedBlockId={selectedBlockId}
            type={type}
          />
        ))}
        {isAdding && selectedMainBlockId === block.id && (
          <TextareaC
            tagName={tagName}
            content={newContent}
            setContent={setNewContent}
            setShowTA={setIsAdding}
            saveContent={saveContent}
          />
        )}
      </div>
    </div>
  );
};

export default PolicyDetails;
