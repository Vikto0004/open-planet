"use client";
import React, { useEffect, useState } from "react";

import "@/app/[lang]/globals.css";
import styles from "./editor.module.css";

interface TextNode {
  tag: "text";
  content: string;
}

interface HtmlNode {
  tag: string;
  className?: string;
  href?: string;
  style?: Record<string, string>;
  children?: (TextNode | HtmlNode)[];
}

interface EditorProps {
  data: HtmlNode[];
  onSave?: (newData: HtmlNode[]) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onSave }) => {
  const [linkUrl, setLinkUrl] = useState<string>("");

  useEffect(() => {
    const editor = document.getElementById("editor");

    const handleInput = () => {};

    if (editor) {
      editor.addEventListener("input", handleInput);

      return () => {
        editor.removeEventListener("input", handleInput);
      };
    }
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
        newElement.classList.add(className);
        if (parentElement.id === "editor") {
          if (selectedNode.nodeType === 3) {
            const textNode = selectedNode as Text;
            textNode.parentNode?.removeChild(textNode);
          }
          editor.appendChild(newElement);
          newElement.innerHTML = selectedNode.textContent || "";
        } else {
          newElement.innerHTML = parentElement.innerHTML;
          parentElement.replaceWith(newElement);
        }
      }
    }
  };

  const transformListToParagraphs = () => {
    const selection = window.getSelection();
    const selectedNode = selection?.anchorNode;

    if (selectedNode) {
      let parentList = null;

      if (selectedNode.nodeType === Node.TEXT_NODE) {
        const parentElement = selectedNode.parentElement;
        if (parentElement) {
          parentList = parentElement.closest("ul, ol");
        }
      } else if (selectedNode.nodeType === Node.ELEMENT_NODE) {
        parentList = (selectedNode as Element).closest("ul, ol");
      }

      if (parentList) {
        Array.from(parentList.children).forEach((li) => {
          const paragraph = document.createElement("p");
          paragraph.innerHTML = li.innerHTML;
          paragraph.className = "editor-paragraph";
          parentList.parentNode?.insertBefore(paragraph, parentList);
        });

        parentList.remove();
      }
    }
  };

  const transformSelectionToList = (newTag: string, className: string) => {
    const editor = document.getElementById("editor");

    if (!editor) return;

    const selection = window.getSelection();
    const selectedNode = selection?.anchorNode;

    if (selectedNode && editor.contains(selectedNode)) {
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const selectedElements = Array.from(range.cloneContents().children);

        const newList = document.createElement(newTag);
        newList.classList.add(className);

        selectedElements.forEach((element) => {
          if (element.tagName === "P" && element.innerHTML.trim() === "") {
            return;
          }

          const listItem = document.createElement("li");

          listItem.innerHTML = element.innerHTML || element.textContent || "";

          newTag === "ul"
            ? listItem.classList.add("editor-unnumbered-item")
            : listItem.classList.add("editor-numbered-item");

          newList.appendChild(listItem);
        });

        range.deleteContents();
        range.insertNode(newList);

        const emptyParagraphs = newList.previousElementSibling;
        if (
          emptyParagraphs &&
          emptyParagraphs.tagName === "P" &&
          emptyParagraphs.innerHTML.trim() === ""
        ) {
          emptyParagraphs.remove();
        }

        const emptyParagraphsAfter = newList.nextElementSibling;
        if (
          emptyParagraphsAfter &&
          emptyParagraphsAfter.tagName === "P" &&
          emptyParagraphsAfter.innerHTML.trim() === ""
        ) {
          emptyParagraphsAfter.remove();
        }
      }
    }
  };

  const formatText = (className: string) => {
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
          newSpan.classList.add(className);
          newSpan.textContent = selectedText;

          range?.deleteContents();
          range?.insertNode(newSpan);
        } else {
          if (parentSpan.classList.contains(className)) {
            parentSpan.classList.remove(className);
          } else {
            parentSpan.classList.add(className);
          }
        }
      }
    }
  };

  const addLink = (className: string) => {
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
        const parentElement = selectedNode.parentElement;

        if (parentElement && parentElement.tagName === "A") {
          const anchorElement = parentElement as HTMLAnchorElement;
          anchorElement.href = linkUrl || "";
        } else {
          const link = document.createElement("a");
          link.classList.add(className);
          link.textContent = selectedText;
          link.href = linkUrl || "";
          link.target = "_blank";

          range?.deleteContents();
          range?.insertNode(link);

          link.addEventListener("click", (event) => {
            event.preventDefault();
            window.open(link.href, "_blank");
          });
        }
      }
    }
  };

  const handleLinkInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLinkUrl(event.target.value);
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
        if (
          parentSpan &&
          (parentSpan.tagName === "SPAN" || parentSpan.tagName === "A")
        ) {
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

  // // Функція для перетворення JSON в HTML
  // const jsonToHtml = (json: HtmlNode[]): string => {
  //   console.log(json);
  //   return json
  //     .map((block) => {
  //       const childrenContent = block.children
  //         ? block.children
  //             .map((child) => {
  //               if (child.tag === "text") {
  //                 return (child as TextNode).content;
  //               }

  //               const classAttr = (child as HtmlNode).className
  //                 ? ` class="${(child as HtmlNode).className}"`
  //                 : "";
  //               switch (child.tag) {
  //                 case "a":
  //                   return `<a href="${child.href}"${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</a>`;
  //                 case "span":
  //                   return `<span${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</span>`;
  //                 case "h1":
  //                   return `<h1${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</h1>`;
  //                 case "h2":
  //                   return `<h2${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</h2>`;
  //                 case "h3":
  //                   return `<h3${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</h3>`;
  //                 case "p":
  //                   return `<p${classAttr}>${child.children?.map((text) => (text as TextNode).content).join("")}</p>`;
  //                 case "ul":
  //                   return `<ul${classAttr}>${child.children
  //                     ?.map((li) => {
  //                       return `<li${(li as HtmlNode).className ? ` class="${(li as HtmlNode).className}"` : ""}>${(li as HtmlNode).children?.map((text) => (text as TextNode).content).join("")}</li>`;
  //                     })
  //                     .join("")}</ul>`;
  //                 case "ol":
  //                   return `<ul${classAttr}>${child.children
  //                     ?.map((li) => {
  //                       return `<li${(li as HtmlNode).className ? ` class="${(li as HtmlNode).className}"` : ""}>${(li as HtmlNode).children?.map((text) => (text as TextNode).content).join("")}</li>`;
  //                     })
  //                     .join("")}</ul>`;

  //                 default:
  //                   return "";
  //               }
  //             })
  //             .join(" ")
  //         : "";

  //       if (block.tag === "ul") {
  //         return `<ul class="${(block as HtmlNode).className}">${block.children
  //           ?.map((li) => {
  //             return `<li${(li as HtmlNode).className ? ` class="${(li as HtmlNode).className}"` : ""}>${(li as HtmlNode).children?.map((text) => (text as TextNode).content).join("")}</li>`;
  //           })
  //           .join("")}</ul>`;
  //       }
  //       if (block.tag === "ol") {
  //         return `<ol class="${(block as HtmlNode).className}">${block.children
  //           ?.map((li) => {
  //             return `<li${(li as HtmlNode).className ? ` class="${(li as HtmlNode).className}"` : ""}>${(li as HtmlNode).children?.map((text) => (text as TextNode).content).join("")}</li>`;
  //           })
  //           .join("")}</ol>`;
  //       }
  //       const blockClassAttr = block.className
  //         ? ` class="${block.className}"`
  //         : "";
  //       return `<${block.tag}${blockClassAttr}>${childrenContent}</${block.tag}>`;
  //     })
  //     .join("");
  // };

  const jsonToHtml = (json: (HtmlNode | TextNode)[]): string => {
    return json
      .map((node) => {
        if (node.tag === "text") {
          return (node as TextNode).content;
        }

        const htmlNode = node as HtmlNode;
        const attributes: string[] = [];
        if (htmlNode.className)
          attributes.push(`class="${htmlNode.className}"`);
        if (htmlNode.href) attributes.push(`href="${htmlNode.href}"`);
        if (htmlNode.style && Object.keys(htmlNode.style).length > 0) {
          const styleString = Object.entries(htmlNode.style)
            .map(([key, value]) => `${key}: ${value};`)
            .join(" ");
          attributes.push(`style="${styleString}"`);
        }

        const attrString =
          attributes.length > 0 ? " " + attributes.join(" ") : "";
        const childrenContent = htmlNode.children
          ? jsonToHtml(htmlNode.children)
          : "";

        return `<${htmlNode.tag}${attrString}>${childrenContent}</${htmlNode.tag}>`;
      })
      .join("");
  };

  // Обробка збереження контенту (конвертація HTML назад у JSON)
  const saveContent = () => {
    const editorContent = document.getElementById("editor");
    if (!editorContent) return;

    const updatedHtml = editorContent.innerHTML;
    const json = htmlToJson(updatedHtml);
    if (onSave) {
      onSave(json);
    }
  };

  // Функція для перетворення HTML назад у JSON
  const htmlToJson = (html: string): HtmlNode[] => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const elements = Array.from(doc.body.childNodes);

    return elements.map(parseElement);
  };

  const parseElement = (element: Node): HtmlNode | TextNode => {
    if (element.nodeType === Node.TEXT_NODE) {
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
        <div className={styles.toolbarElements}>
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
              onClick={() =>
                changeElementType("h2", "editor-heading-secondary")
              }
            >
              H2
            </button>
            <button
              onClick={() => changeElementType("h3", "editor-heading-tertiary")}
            >
              H3
            </button>
          </div>
        </div>
        <div className={styles.toolbarElements}>
          <p>Lists:</p>
          <div className={styles.elements}>
            <button
              onClick={() =>
                transformSelectionToList("ul", "editor-unnumbered-item")
              }
            >
              UnNum
            </button>
            <button
              onClick={() =>
                transformSelectionToList("ol", "editor-numbered-item")
              }
            >
              Num
            </button>
            <button onClick={transformListToParagraphs}>Reset</button>
          </div>
        </div>
        <div className={styles.toolbarElements}>
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
        <div className={styles.toolbarElements}>
          <p>Link:</p>
          <div className={styles.link}>
            <input
              type="text"
              placeholder="https://openplanetua.org/"
              value={linkUrl}
              onChange={handleLinkInputChange}
              className={styles.input}
            />
            <button onClick={() => addLink("editor-link")}>Add</button>
            <button onClick={clearFormatting}>Delete</button>
          </div>
        </div>
        <button onClick={saveContent}>Save</button>
      </div>
      <div
        id="editor"
        className={styles.container}
        contentEditable
        dangerouslySetInnerHTML={{ __html: jsonToHtml(data) }}
      />
    </div>
  );
};

export default Editor;
