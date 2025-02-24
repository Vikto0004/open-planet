"use client";
// components/Editor.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import React, { useState, useEffect } from "react";

import { Node } from "@/query/types/public-offer";

import CustomModules from "./CustomModules";
import styles from "./editor.module.css";

// import "@/app/admin/(styles)/global.css";
import "@/app/[lang]/globals.css";

// Імпорт даних з локального JSON-файлу
import data from "./test1.json";

const Editor = () => {
  const [content, setContent] = useState("");

  // Ініціалізація редактора Tiptap
  const editor = useEditor({
    extensions: [
      StarterKit, // Це включає BulletList і ListItem
    ],
    content: "", // Початковий контент
  });

  //Завантаження контенту з локального JSON при монтуванні
  useEffect(() => {
    if (editor) {
      editor.setEditable(true);
      const htmlContent = convertJsonToHtml(data);
      console.log(htmlContent);
      editor.commands.setContent(htmlContent, false);
    }
  }, [editor, content]);

  // Функція для перетворення JSON в HTML
  const convertJsonToHtml = (json: Node[]): string => {
    return json
      .map((block) => {
        const childrenContent = block.children
          ? block.children
              .map((child) => {
                // Перевіряємо, чи є child.className і якщо є, додаємо його до тега
                const classAttribute = child.className
                  ? ` class="${child.className}"`
                  : "";

                switch (child.tag) {
                  case "text":
                    return child.content;
                  case "a":
                    return `<a href="${child.href}"${classAttribute}>${child.children?.map((text) => text.content).join("")}</a>`;
                  case "span":
                    return `<span${classAttribute}>${child.children?.map((text) => text.content).join("")}</span>`;
                  case "ul":
                    return `<ul${classAttribute}>${child.children?.map((li) => `<li class="${li.className}">${li.children?.map((text) => text.content).join("")}</li>`).join("")}</ul>`;
                  case "h1":
                    return `<h1${classAttribute}>${child.children?.map((text) => text.content).join("")}</h1>`;
                  case "h2":
                    return `<h2${classAttribute}>${child.children?.map((text) => text.content).join("")}</h2>`;
                  case "h3":
                    return `<h3${classAttribute}>${child.children?.map((text) => text.content).join("")}</h3>`;
                  case "p":
                    console.log(classAttribute);
                    return `<p${classAttribute}>${child.children?.map((text) => text.content).join("")}</p>`;
                  default:
                    return "";
                }
              })
              .join("")
          : "";

        // Додаємо клас до основного тега блоку, якщо є
        const blockClassAttribute = block.className
          ? ` class="${block.className}"`
          : "";

        return `<${block.tag}${blockClassAttribute}>${childrenContent}</${block.tag}>`;
      })
      .join("");
  };

  // Функція для додавання нового блоку
  const addBlock = (tag: string) => {
    if (!editor) return;
    switch (tag) {
      case "p":
        editor.chain().focus().setParagraph().run();
        break;
      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case "h3":
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case "list":
        editor.chain().focus().toggleBulletList().run();
        break;
      default:
        break;
    }
  };

  // Функція для застосування стилів
  const applyStyle = (style: string) => {
    if (!editor) return;
    switch (style) {
      case "bold": {
        editor.chain().focus().toggleBold().run();
        break;
      }
      case "italic": {
        editor.chain().focus().toggleItalic().run();
        break;
      }
      case "link": {
        const href = prompt("Введіть URL");
        if (href) {
          editor.chain().focus().setLink({ href }).run();
        }
        break;
      }
      default:
        break;
    }
  };

  // Функція для збереження контенту в локальному стані (на майбутнє)
  const saveContent = () => {
    if (editor) {
      const updatedContent = editor.getHTML();
      console.log(updatedContent); // Тут можна зберігати контент в стан або відправити на сервер
    }
  };

  return (
    <div className={styles.editor}>
      {/* Вміст редактора */}
      <EditorContent editor={editor} />

      {/* Панель інструментів */}
      <div className={styles.toolbar}>
        <button onClick={() => addBlock("p")}>P</button>
        <button onClick={() => addBlock("h1")}>H1</button>
        <button onClick={() => addBlock("h2")}>H2</button>
        <button onClick={() => addBlock("h3")}>H3</button>
        <button onClick={() => addBlock("list")}>Список</button>
        <button onClick={() => applyStyle("bold")}>B</button>
        <button onClick={() => applyStyle("italic")}>I</button>
        <button onClick={() => applyStyle("link")}>Link</button>
        <button onClick={saveContent}>Save</button>
      </div>
    </div>
  );
};

export default Editor;
