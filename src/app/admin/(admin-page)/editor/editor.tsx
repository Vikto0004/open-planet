"use client";
import React, { useEffect, useState } from "react";

import "@/app/[lang]/globals.css";
import styles from "./editor.module.css";
import data from "./test.json";

interface TextNode {
  tag: "text";
  content: string;
}

interface HtmlNode {
  tag: string;
  className?: string;
  href?: string;
  children?: (TextNode | HtmlNode)[];
}

const Editor: React.FC = () => {
  const [jsonContent, setJsonContent] = useState<HtmlNode[]>([]);

  useEffect(() => {
    setJsonContent(data);
  }, []);

  const changeElementType = (newTag: string, className: string) => {
    const editor = document.getElementById("editor");

    if (!editor) return;

    const selection = window.getSelection();
    const selectedNode = selection?.anchorNode;

    if (selectedNode && editor.contains(selectedNode)) {
      const parentElement = selectedNode.parentElement;
      if (parentElement && selectedNode.nodeType === 3) {
        const newElement = document.createElement(newTag);
        newElement.innerHTML = parentElement.innerHTML;
        newElement.classList.add(className);

        parentElement.replaceWith(newElement);
      }
    }
  };

  const formatText = (command: string) => {
    const editor = document.getElementById("editor");

    if (!editor) return;

    const selection = window.getSelection();
    const selectedText = selection?.toString();

    if (
      selectedText &&
      selection?.anchorNode &&
      editor.contains(selection.anchorNode)
    ) {
      const range = selection?.getRangeAt(0);
      const selectedNode = range?.startContainer;

      if (selectedNode && selectedNode.nodeType === 3) {
        const parentSpan = selectedNode.parentElement;

        if (!parentSpan || parentSpan.tagName !== "SPAN") {
          const newSpan = document.createElement("span");
          newSpan.classList.add(command);
          newSpan.textContent = selectedText;

          range?.deleteContents();
          range?.insertNode(newSpan);
        } else {
          if (parentSpan.classList.contains(command)) {
            parentSpan.classList.remove(command);
          } else {
            parentSpan.classList.add(command);
          }
        }
      }
    }
  };

  const clearFormatting = () => {
    const editor = document.getElementById("editor");

    if (!editor) return;

    const selection = window.getSelection();

    if (
      selection &&
      selection.rangeCount > 0 &&
      editor.contains(selection?.anchorNode)
    ) {
      const range = selection.getRangeAt(0);
      const selectedNode = range.startContainer;

      if (selectedNode && selectedNode.nodeType === 3) {
        const parentSpan = selectedNode.parentElement;

        if (parentSpan && parentSpan.tagName === "SPAN") {
          const parentNode = parentSpan.parentElement;

          if (parentNode) {
            while (parentSpan.firstChild) {
              parentNode.insertBefore(parentSpan.firstChild, parentSpan);
            }

            parentNode.removeChild(parentSpan);
          }
        }
      }
    }
  };

  // Функція для перетворення JSON в HTML
  const jsonToHtml = (json: HtmlNode[]): string => {
    return json
      .map((block) => {
        const childrenContent = block.children
          ? block.children
              .map((child) => {
                if (child.tag === "text") {
                  return (child as TextNode).content;
                }

                const classAttr = (child as HtmlNode).className
                  ? ` class="${(child as HtmlNode).className}"`
                  : "";
                switch (child.tag) {
                  case "a":
                    return `<a href="${child.href}"${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</a>`;
                  case "span":
                    return `<span${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</span>`;
                  case "h1":
                    return `<h1${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</h1>`;
                  case "h2":
                    return `<h2${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</h2>`;
                  case "h3":
                    return `<h3${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</h3>`;
                  case "p":
                    return `<p${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</p>`;
                  default:
                    return "";
                }
              })
              .join(" ")
          : "";

        const blockClassAttr = block.className
          ? ` class="${block.className}"`
          : "";
        return `<${block.tag}${blockClassAttr}>${childrenContent}</${block.tag}>`;
      })
      .join("");
  };

  // Обробка збереження контенту (конвертація HTML назад у JSON)
  const saveContent = () => {
    const editorContent = document.getElementById("editor")!.innerHTML;
    const json = htmlToJson(editorContent);
    console.log(JSON.stringify(json, null, 2));
    setJsonContent(json);
  };

  // Функція для перетворення HTML назад у JSON
  const htmlToJson = (html: string): HtmlNode[] => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const elements = Array.from(doc.body.childNodes);

    return elements.map(parseElement);
  };

  const parseElement = (element: Node): HtmlNode | TextNode => {
    if (element.nodeType === 3) {
      return { tag: "text", content: element.textContent || "" };
    }

    const htmlElement = element as HTMLElement;
    const children = Array.from(htmlElement.childNodes).map(parseElement);

    return {
      tag: htmlElement.tagName.toLowerCase(),
      className: htmlElement.className || undefined,
      href: (htmlElement as HTMLAnchorElement).href || undefined,
      children: children.length > 0 ? children : undefined,
    };
  };

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <p>Elements:</p>
        <div className={styles.elements}>
          <button onClick={() => changeElementType("p", "editor-paragraph")}>
            P
          </button>
          <button
            onClick={() => changeElementType("h1", "editor-heading-primary")}
          >
            H1
          </button>
          <button
            onClick={() => changeElementType("h2", "editor-heading-secondary")}
          >
            H2
          </button>
          <button
            onClick={() => changeElementType("h3", "editor-heading-tertiary")}
          >
            H3
          </button>
          <button>Link</button>
        </div>
        <p>Styles:</p>
        <div className={styles.effects}>
          <button onClick={() => formatText("editor-text-bold")}>B</button>
          <button onClick={() => formatText("editor-text-italic")}>I</button>
          <button onClick={() => formatText("editor-text-underline")}>
            Underline
          </button>
          <button onClick={() => formatText("editor-text-uppercase")}>
            Uppercase
          </button>
          <button onClick={clearFormatting}>Clear</button>
        </div>
      </div>

      <div
        id="editor"
        className={styles.content}
        contentEditable
        dangerouslySetInnerHTML={{ __html: jsonToHtml(jsonContent) }}
      />
    </div>
  );
};

export default Editor;
