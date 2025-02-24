import { Bold } from "@tiptap/extension-bold";
import { Heading } from "@tiptap/extension-heading";
import { Italic } from "@tiptap/extension-italic";
import { Link } from "@tiptap/extension-link";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";

const CustomModules = {
  // Кастомне розширення для абзаців
  Paragraph: Paragraph.configure({
    HTMLAttributes: {
      class: "editor-paragraph",
    },
  }),

  // Кастомне розширення для тексту
  Text: Text.configure({
    HTMLAttributes: {
      class: "editor-text",
    },
  }),

  // Кастомне розширення для жирного тексту
  Bold: Bold.configure({
    HTMLAttributes: {
      class: "editor-text-bold",
    },
  }),

  // Кастомне розширення для лінків
  Link: Link.configure({
    HTMLAttributes: {
      class: "editor-link",
    },
  }),

  // Кастомне розширення для курсиву
  Italic: Italic.configure({
    HTMLAttributes: {
      class: "editor-italic",
    },
  }),

  // Кастомні заголовки h1-h3
  // Heading: Heading.configure({
  //   levels: [1, 2, 3],
  //   HTMLAttributes: {
  //     class: (node) => {
  //       switch (node.attrs.level) {
  //         case 1:
  //           return "editor-heading-primary"; // Клас для заголовка 1 рівня
  //         case 2:
  //           return "editor-heading-secondary"; // Клас для заголовка 2 рівня
  //         case 3:
  //           return "editor-heading-tertiary"; // Клас для заголовка 3 рівня
  //         default:
  //           return "";
  //       }
  //     },
  //   },
  // }),

  Heading: Heading.configure({
    levels: [3], // Визначаємо лише рівень заголовка 3
    HTMLAttributes: {
      class: "editor-heading-tertiary", // Додаємо клас лише для h3
    },
  }),
};

export default CustomModules;
