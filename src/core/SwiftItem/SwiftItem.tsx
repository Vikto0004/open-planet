import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

import { montserrat } from "../fonts";

import css from "./SwiftItem.module.css";

type PropsType = {
  data: {
    id: string;
    title: null | string;
    subTitle: null | string;
    texts: string[];
  };
};

export default function SwiftItem({ data }: PropsType) {
  const translate = useTranslations("ButtonCopy");

  const [copied, setCopied] = useState(false);
  const { title, subTitle, texts } = data;

  const copyToClipboard = async (textArr: string[]) => {
    if (copied) return;
    const text = textArr.join(" ");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Error copy");
    }
  };

  return (
    <li className={css.listItem}>
      <div>
        {title && (
          <h3 className={clsx(montserrat.className, css.listTitle)}>{title}</h3>
        )}
        {subTitle && (
          <p className={clsx(montserrat.className, css.subTitle)}>{subTitle}</p>
        )}
        <ul className={clsx(montserrat.className, css.listText)}>
          {texts.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
      <button
        className={clsx(montserrat.className, css.btnCopy)}
        onClick={() => copyToClipboard(texts)}
      >
        <FaRegCopy size="24px" />
        {copied ? translate("copied") : translate("copy")}
      </button>
    </li>
  );
}
