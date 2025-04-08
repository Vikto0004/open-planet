import React, { useState } from "react";
import { Path, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { IPolicyBlock } from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { PolicyFormValues } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import { LangType } from "@/i18n/routing";

import TextareaC from "../policy/TextareaC";
import {
  removeBlockById,
  findPathToBlock,
  mergeAdjacentTextBlocks,
} from "../policy/utils";

import styles from "./renderer.module.css";

interface RendererProps {
  node: IPolicyBlock;
  setValue: UseFormSetValue<PolicyFormValues>;
  lang: LangType;
  watch: UseFormWatch<PolicyFormValues>;
  setSelectedBlockId: (id: string) => void;
  selectedBlockId: string | null;
}
export default function Renderer({
  node,
  setValue,
  lang,
  watch,
  setSelectedBlockId,
  selectedBlockId,
}: RendererProps) {
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  if (node.tag === "text") {
    return <div data-id={node.id}>{node.content}</div>;
  }
  //console.log(JSON.stringify(node, null, 2));
  const Tag = node.tag as keyof JSX.IntrinsicElements;

  const additionalProps = Tag === "a" && node.href ? { href: node.href } : {};

  const handleRemove = (id: string) => {
    const blocks = watch(`${lang}.blocks`);
    const parentPath = `${lang}.blocks`;

    if (id) {
      const path = findPathToBlock(id, blocks, parentPath);

      if (path) {
        const pathSegments = path.split(".");
        const parentChildrenPath =
          pathSegments.slice(0, -1).join(".") + ".children";
        const parentChildren = watch(
          parentChildrenPath as Path<PolicyFormValues>,
        );
        if (Array.isArray(parentChildren)) {
          const updatedChildren = removeBlockById(id, parentChildren);
          const cleanedChildren = mergeAdjacentTextBlocks(updatedChildren);
          setValue(
            parentChildrenPath as Path<PolicyFormValues>,
            cleanedChildren,
          );
        }
      }
    }
  };

  const handleDoubleClick = (e: React.MouseEvent<Element>) => {
    e.stopPropagation();

    if (selectedBlockId) {
      const blocks = watch(`${lang}.blocks`);
      const path = findPathToBlock(selectedBlockId, blocks, `${lang}.blocks`);

      if (path) {
        const block = watch(path as Path<PolicyFormValues>);
        if (block && typeof block !== "string" && "content" in block) {
          setIsEditing(true);
          setEditContent(block?.content || "");
        }
      }
    }
  };

  const handleClick = (e: React.MouseEvent<Element>) => {
    e.stopPropagation();

    const clickedElement = e.target as HTMLElement;
    const newBlockId = clickedElement.getAttribute("data-id");
    if (newBlockId) {
      setSelectedBlockId(newBlockId);
    }
  };

  const updateContent = () => {
    const blocks = watch(`${lang}.blocks`);
    const parentPath = `${lang}.blocks`;
    if (selectedBlockId) {
      const path = findPathToBlock(selectedBlockId, blocks, parentPath);

      setIsEditing(false);
      setValue(`${path}.content` as Path<PolicyFormValues>, editContent);
    }
  };

  return (
    <div className={styles.container}>
      <p>{node.tag}</p>
      <div className={styles.content}>
        <Tag
          data-id={node.id}
          className={`${node.className || ""} ${styles.tagInfo}`}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          //   style={node.style || ""}
          {...additionalProps}
        >
          {node.children?.map((child, index) => {
            if (isEditing && child.id === selectedBlockId) {
              return (
                <TextareaC
                  key={index}
                  tagName={node.tag}
                  content={editContent}
                  setContent={setEditContent}
                  setShowTA={setIsEditing}
                  saveContent={updateContent}
                />
              );
            } else {
              return (
                <Renderer
                  key={index}
                  selectedBlockId={selectedBlockId}
                  setSelectedBlockId={setSelectedBlockId}
                  node={child}
                  setValue={setValue}
                  lang={lang}
                  watch={watch}
                />
              );
            }
          })}
        </Tag>
        <button
          className={styles.delete}
          onClick={() => {
            handleRemove(node.id);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
}
