import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { montserrat } from "@/core/fonts";

import css from "./ContentItem.module.css";

type PropsType = {
  id: string;
  type: string;
  content: string | string[];
  updateContentById: (currentId: string, newContent: string | string[]) => void;
};

export default function ContentItem({
  id,
  type,
  content,
  updateContentById,
}: PropsType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isActive, setIsActive] = useState(false);

  const [value, setValue] = useState<string>(() => {
    if (Array.isArray(content)) return content.join("\n\n");
    else return content;
  });

  const newContent = () => {
    if (type === "paragraf") return value.split("\n\n");
    else return value;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isActive) setIsActive(true);
    else {
      setIsActive(false);
      updateContentById(id, newContent());
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${textarea?.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  return (
    <li>
      <form onSubmit={handleSubmit}>
        {type !== "paragraf" ? (
          <input
            className={clsx(
              css.input,
              css[type],
              montserrat.className,
              isActive && css.isActive,
            )}
            type="text"
            disabled={!isActive}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <textarea
            ref={textareaRef}
            className={clsx(
              css.input,
              css[type],
              montserrat.className,
              isActive && css.isActive,
            )}
            disabled={!isActive}
            value={value}
            onInput={handleInput}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        )}
        <button className={css.button} type="submit">
          {isActive ? "Зберегти" : "Редагувати"}
        </button>
      </form>
    </li>
  );
}
