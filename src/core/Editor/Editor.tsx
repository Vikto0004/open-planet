"use client"; // якщо використовуєте Next.js з app directory

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";

// Типи пропсів для компонента Editor
interface EditorProps {
  onChange?: (content: string) => void; // Callback для передачі даних
  initialValue?: string; // Початкове значення редактора
}

const Editor: React.FC<EditorProps> = ({ onChange, initialValue = "" }) => {
  const [data, setData] = useState<string>(initialValue);

  if (typeof window === "undefined") {
    return null;
  }

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(
          event: unknown,
          editor: ClassicEditor, // Тип екземпляра редактора
        ) => {
          const content = editor.getData(); // Виклик методу екземпляра редактора
          setData(content);
          if (onChange) {
            onChange(content);
          }
        }}
      />
    </div>
  );
};

export default Editor;
