"use client";
import { useState } from "react";
import { Path, UseFormSetValue, UseFormWatch } from "react-hook-form";

import {
  IPolicy,
  IPolicyBlock,
  TagsClasses,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";
import { PolicyFormValues } from "@/admin-shared/model/schemas/workDirectionYupSchemas";
import { LangType } from "@/i18n/routing";

import { createPolicyBlock, findPathToBlock } from "../policy/utils";

import styles from "./ToolBar.module.css";

interface ToolBarProps {
  setIsAdding: (value: boolean) => void;
  setTagName: (value: string) => void;
  lang: LangType;
  setValue: UseFormSetValue<PolicyFormValues>;
  watch: UseFormWatch<PolicyFormValues>;
  selectedMainBlockId: string | null;
}

const ToolBar: React.FC<ToolBarProps> = ({
  setIsAdding,
  setTagName,
  setValue,
  lang,
  watch,
  selectedMainBlockId,
}) => {
  //console.log(' ' + JSON.stringify(, null, 2));
  const [linkUrl, setLinkUrl] = useState<string>("");

  const showId = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const selectedNode = range.startContainer.parentElement;
    const blockId = selectedNode?.dataset.id;

    console.log("blockId: " + blockId);
  };

  const changeElementType = (newTag: string) => {
    if (selectedMainBlockId !== null) {
      setIsAdding(true);
      setTagName(newTag);
    }
  };

  const handleLinkInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLinkUrl(event.target.value);
  };

  const sliceingBlocks = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const selectedNode = range.startContainer.parentElement;
    const blockId = selectedNode?.dataset.id;
    if (!blockId) return;

    const parentPath = `${lang}.blocks`;
    const blocks = watch(parentPath as Path<PolicyFormValues>);
    const pathToTextNode: string | null = Array.isArray(blocks)
      ? findPathToBlock(blockId, blocks, parentPath)
      : null;

    if (!pathToTextNode) return;

    const fullText = watch(`${pathToTextNode}.content` as Path<IPolicy>);

    const start = range.startOffset;
    const end = range.endOffset;

    if (!fullText) return;
    if (typeof fullText !== "string") return;
    const before = fullText.slice(0, start);
    const text = fullText.slice(start, end);
    const after = fullText.slice(end);
    return { before, text, after, pathToTextNode, blockId };
  };

  const createLink = () => {
    if (!linkUrl) return;
    const sliceResult = sliceingBlocks();

    // Перевірка на undefined
    if (!sliceResult) return;

    const { before, text, after, pathToTextNode } = sliceResult;

    setValue(`${pathToTextNode}.content` as Path<IPolicy>, before);

    const pathToChildrenArray = pathToTextNode.replace(
      /\.children\[\d+\]$/,
      ".children",
    ) as Path<IPolicy>;

    const newLinkBlock = {
      id: createPolicyBlock(),
      tag: "a",
      className: TagsClasses["a"],
      href: linkUrl.startsWith("www.")
        ? "https://" + linkUrl
        : "https://" + "www." + linkUrl,
      children: [
        {
          id: createPolicyBlock(),
          tag: "text",
          content: text,
        },
      ],
    };

    const afterTextBlock =
      after.trim() !== ""
        ? [
            {
              id: createPolicyBlock(),
              tag: "text",
              content: after,
            },
          ]
        : [];

    const currentChildren =
      (watch(pathToChildrenArray) as IPolicyBlock[]) || [];
    const updatedChildren = [
      ...currentChildren,
      newLinkBlock,
      ...afterTextBlock,
    ];

    setValue(pathToChildrenArray, updatedChildren);
  };

  const formatText = (style: keyof typeof TagsClasses) => {
    const sliceResult = sliceingBlocks();
    if (!sliceResult) return;

    const { before, text, after, pathToTextNode, blockId } = sliceResult;

    const pathToParentContent = pathToTextNode.replace(
      /(\.children\[\d+\])\.children\[\d+\]$/,
      ".children",
    ) as Path<IPolicy>;
    const pathToChildrenArray = pathToTextNode.replace(
      /\.children\[\d+\]$/,
      ".children",
    ) as Path<IPolicy>;

    const currentParentContent =
      (watch(pathToParentContent) as IPolicyBlock[]) || [];
    const currentChildren =
      (watch(pathToChildrenArray) as IPolicyBlock[]) || [];

    const existingSpan = currentParentContent.find(
      (child) =>
        child.tag === "span" &&
        child.className &&
        Array.isArray(child.children) &&
        child.children.some(
          (nested) => nested.tag === "text" && nested.id === blockId,
        ),
    );

    if (existingSpan) {
      let returtToBlock = false;
      const updatedChildren = currentParentContent.map((child) => {
        if (child === existingSpan) {
          if (child.className && child.className.includes(TagsClasses[style])) {
            const updatedClassName = child.className
              .split(" ")
              .filter((className) => className !== TagsClasses[style])
              .join(" ");

            if (updatedClassName === "") {
              returtToBlock = true;
              console.log("empty");
            }

            return {
              ...child,
              className: updatedClassName,
            };
          }
          return {
            ...child,
            className: `${child.className} ${TagsClasses[style]}`,
          };
        }
        return child;
      });

      if (returtToBlock) {
        const spanIndex = updatedChildren.findIndex(
          (child) =>
            child.tag === "span" &&
            Array.isArray(child.children) &&
            child.children.some(
              (nested) => nested.tag === "text" && nested.id === blockId,
            ),
        );

        if (spanIndex !== -1) {
          const before = updatedChildren[spanIndex - 1];
          const targetSpan = updatedChildren[spanIndex];
          const after = updatedChildren[spanIndex + 1];

          const beforeContent = before?.content ?? "";
          const spanContent =
            targetSpan?.children?.map((nested) => nested.content).join("") ??
            "";
          const afterContent = after?.content ?? "";

          const mergedContent = `${beforeContent}${spanContent}${afterContent}`;
          const newTextBlock = {
            id: before?.id ?? createPolicyBlock(),
            tag: "text",
            content: mergedContent,
          };
          const newChildren = [
            ...updatedChildren.slice(0, spanIndex - 1),
            newTextBlock,
            ...updatedChildren.slice(spanIndex + 2),
          ];

          setValue(pathToParentContent, newChildren);
        }
      } else {
        setValue(pathToParentContent, updatedChildren);
      }
    } else {
      const newSpanBlock = {
        id: createPolicyBlock(),
        tag: "span",
        className: TagsClasses[style],
        children: [
          {
            id: createPolicyBlock(),
            tag: "text",
            content: text,
          },
        ],
      };

      const afterTextBlock =
        after.trim() !== ""
          ? [
              {
                id: createPolicyBlock(),
                tag: "text",
                content: after,
              },
            ]
          : [];

      const updatedFinalChildren = [
        ...currentChildren,
        newSpanBlock,
        ...afterTextBlock,
      ];

      setValue(pathToChildrenArray, updatedFinalChildren);

      setValue(`${pathToTextNode}.content` as Path<IPolicy>, before);
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarElements}>
        <p>Elements:</p>
        <div className={styles.elements}>
          <button onClick={() => changeElementType("p")}>P</button>
          <button onClick={() => changeElementType("h1")}>H1</button>
          <button onClick={() => changeElementType("h2")}>H2</button>
          <button onClick={() => changeElementType("h3")}>H3</button>
        </div>
      </div>
      <div className={styles.toolbarElements}>
        <p>Lists:</p>
        <div className={styles.elements}>
          <button onClick={() => changeElementType("ul")}>UnNum</button>
          <button onClick={() => changeElementType("ol")}>Num</button>
          <button onClick={() => changeElementType("li")}>li</button>
        </div>
      </div>
      <div className={styles.toolbarElements}>
        <p>Styles:</p>
        <div className={styles.effects}>
          <button onClick={() => formatText("bold")}>B</button>
          <button onClick={() => formatText("i")}>I</button>
          <button onClick={() => formatText("under")}>Underline</button>
          <button onClick={() => formatText("upper")}>Uppercase</button>
          <button onClick={showId}>Clear</button>
        </div>
      </div>
      <div className={styles.toolbarElements}>
        <p>Link:</p>
        <div className={styles.link}>
          <input
            type="text"
            placeholder="openplanetua.org"
            value={linkUrl}
            onChange={handleLinkInputChange}
            className={styles.input}
          />
          <button onClick={() => createLink()}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
