"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

import {
  deleteVacancyBlock,
  getVacancyById,
  putVacancyBlock,
} from "@/query/api/vacancy";
import { PublicOfferBlock } from "@/query/types/public-offer";
import { Vacancy } from "@/query/types/vacancy";

import { montserrat, oldStandardTT } from "../fonts";
import Renderer from "../Renderer/Renderer";

import css from "./Editor.module.css";
import { parseEditableContent } from "./utils";

type PropsType = {
  data: PublicOfferBlock[];
  blockId: string | undefined;
  vacancyId: string;
  setVacancy: Dispatch<SetStateAction<Vacancy | null>>;
};

export default function Editor({
  data,
  blockId,
  vacancyId,
  setVacancy,
}: PropsType) {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const [textStyle, setTextStyle] = useState<
    "bold" | "usual" | "h1" | "h2" | "h3"
  >("usual");

  useEffect(() => {
    if (contentEditableRef.current) {
      const root = ReactDOM.createRoot(contentEditableRef.current);
      root.render(
        data.map((node, index) => node && <Renderer key={index} node={node} />),
      );
    }
  }, [data]);

  const cursorSetting = (element: HTMLElement | Text | Node): void => {
    const selection = window.getSelection();
    if (!selection || !contentEditableRef.current) return;

    const newRange = document.createRange();
    newRange.setStartAfter(element);
    selection.removeAllRanges();
    selection.addRange(newRange);
  };

  const createElement = (
    tag: string,
    classes: string[],
    text: string = "",
    id: string,
  ): HTMLElement => {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    element.textContent = text;
    element.id = id;
    return element;
  };

  const searchNearestFather = (
    tag: string,
    targetId: string,
  ): HTMLElement | null => {
    const selection = window.getSelection();
    if (!selection || !contentEditableRef.current) return null;

    const range = selection.getRangeAt(0);
    const parentNode = range.commonAncestorContainer;
    if (!contentEditableRef.current.contains(parentNode)) return null;

    let node: Node | null = parentNode;
    while (node && node !== contentEditableRef.current) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).tagName.toLowerCase() === tag &&
        (node as HTMLElement).id === targetId
      ) {
        return node as HTMLElement;
      }
      node = node.parentNode;
    }
    return null;
  };

  const insertText = (
    textStyle: "bold" | "usual" | "h1" | "h2" | "h3",
    text: string = "\u00A0",
    isEnter: boolean = false,
  ): void => {
    setTextStyle(textStyle);
    const selection = window.getSelection();

    if (!selection || !contentEditableRef.current) return;
    const range = selection.getRangeAt(0);
    let currentNode = range.commonAncestorContainer;

    if (currentNode.nodeType === Node.TEXT_NODE) {
      currentNode = currentNode.parentNode as HTMLElement;
    }

    const { tag, targetId } = searchIdAndTag(textStyle, currentNode.nodeName);
    let fatherEl: HTMLElement | null = searchNearestFather(tag, targetId);
    let elementToInsert;

    const isMatchingStyle =
      (textStyle === "bold" && currentNode.nodeName === "SPAN") ||
      (textStyle === "h1" && currentNode.nodeName === "H1") ||
      (textStyle === "h2" && currentNode.nodeName === "H2") ||
      (textStyle === "h3" && currentNode.nodeName === "H3") ||
      (textStyle === "usual" && currentNode.nodeName === "P");

    if (isMatchingStyle && !isEnter) {
      currentNode.appendChild(document.createTextNode(text));
      cursorSetting(currentNode);
      return;
    }

    if (!fatherEl) {
      fatherEl = contentEditableRef.current;
    }

    if (textStyle === "usual") {
      elementToInsert = createElement(
        "p",
        ["editor-paragraph", montserrat.className],
        text,
        "my-paragraph-id",
      );
    } else if (textStyle === "bold") {
      elementToInsert = createElement(
        "span",
        ["editor-text-bold", montserrat.className],
        text,
        "my-span-id",
      );
    } else if (textStyle === "h1") {
      elementToInsert = createElement(
        "h1",
        ["editor-heading-primary", oldStandardTT.className],
        text,
        "my-primary-id",
      );
    } else if (textStyle === "h2") {
      elementToInsert = createElement(
        "h2",
        ["editor-heading-secondary", montserrat.className],
        text,
        "my-secondary-id",
      );
    } else if (textStyle === "h3") {
      elementToInsert = createElement(
        "h3",
        ["editor-heading-tertiary", montserrat.className],
        text,
        "my-tertiary-id",
      );
    } else {
      elementToInsert = document.createTextNode(text);
    }

    if (textStyle === "usual" && currentNode.nodeName === "SPAN") {
      elementToInsert = document.createTextNode(text);
    }

    fatherEl.appendChild(elementToInsert);
    cursorSetting(elementToInsert);
    contentEditableRef.current.focus();

    range.selectNodeContents(elementToInsert);
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData
      .getData("text/plain")
      .replace(/<[^>]+>/g, "");

    insertText(textStyle, pastedText);
  };

  const ensureParagraphWrapper = () => {
    if (!contentEditableRef.current) return;

    const childNodes = Array.from(contentEditableRef.current.childNodes);

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== "") {
        const pElement = document.createElement("p");
        pElement.classList.add("editor-paragraph", montserrat.className);
        pElement.id = "my-paragraph-id";
        pElement.textContent = node.textContent;
        contentEditableRef.current?.replaceChild(pElement, node);

        cursorSetting(pElement);
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      insertText("usual", "\u00A0", true);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.wrapTools}>
        <button type="button" onClick={() => insertText("bold")}>
          Bold
        </button>
        <button type="button" onClick={() => insertText("usual")}>
          Usual
        </button>
        <button type="button" onClick={() => insertText("h1")}>
          H1
        </button>
        <button type="button" onClick={() => insertText("h2")}>
          H2
        </button>
        <button type="button" onClick={() => insertText("h3")}>
          H3
        </button>
      </div>
      <div
        ref={contentEditableRef}
        contentEditable
        onInput={ensureParagraphWrapper}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        id="my-container-id"
        className="editor-block"
      ></div>
      <div className={css.wrap}>
        <button
          onClick={() => {
            if (contentEditableRef.current && blockId) {
              putVacancyBlock(
                vacancyId,
                blockId,
                parseEditableContent(contentEditableRef.current),
              );
            }
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            const fetchVacancyById = async () => {
              blockId && (await deleteVacancyBlock(vacancyId, blockId));
              const data = await getVacancyById(vacancyId, "ua");
              setVacancy(data);
            };
            fetchVacancyById();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function searchIdAndTag(textStyle: string, nodeName: string) {
  if (textStyle === "bold") {
    if (nodeName === "P") {
      return { tag: "p", targetId: "my-paragraph-id" };
    } else if (nodeName === "H1") {
      return { tag: "h1", targetId: "my-primary-id" };
    } else if (nodeName === "H2") {
      return { tag: "h2", targetId: "my-secondary-id" };
    } else if (nodeName === "H3") {
      return { tag: "h3", targetId: "my-tertiary-id" };
    } else {
      return { tag: "div", targetId: "my-container-id" };
    }
  } else {
    return { tag: "div", targetId: "my-container-id" };
  }
}
