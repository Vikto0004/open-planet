"use client";

import css from "./Tools.module.css";
import React from "react";

type Tool = {
  id: string;
  type: "title" | "subtitle" | "paragraf";
  content: string;
  contentForInp: {
    en: string;
    ua: string;
  };
};

const tools: Tool[] = [
  {
    id: "1",
    type: "title",
    content: "Додати заголовок",
    contentForInp: {
      en: "Title",
      ua: "Заголовок",
    },
  },
  {
    id: "3",
    type: "subtitle",
    content: "Додати підзаголовок",
    contentForInp: {
      en: "Subtitle",
      ua: "Підзаголовок",
    },
  },
  {
    id: "2",
    type: "paragraf",
    content: "Додати абзац",
    contentForInp: {
      en: "Paragraf",
      ua: "Абзац",
    },
  },
];

type PropsType = {
  addContent: (type: string, content: { en: string; ua: string }) => void;
};

export default function Tools({ addContent }: PropsType) {
  return (
    <ul className={css.list}>
      {tools.map(({ id, type, content, contentForInp }) => (
        <li key={id}>
          <button onClick={() => addContent(type, contentForInp)}>
            {content}
          </button>
        </li>
      ))}
    </ul>
  );
}
