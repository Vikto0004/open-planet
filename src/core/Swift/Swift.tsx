"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

import swiftData from "@/db-local/swift_data.json";
import { isValidLang } from "@/utils/helper";

import { montserrat } from "../fonts";

import css from "./Swift.module.css";

export default function Swift() {
  const [selectedProps, setSelectedProps] = useState<"inUkraine" | "swift">(
    "inUkraine",
  );
  const { lang } = useParams();
  const [data, setData] = useState(() => {
    return swiftData[isValidLang(lang)][selectedProps];
  });
  const [copied, setCopied] = useState(false);

  const selectProps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const buttonText = (e.target as HTMLButtonElement).id;

    if (buttonText === "inUkraine" || buttonText === "swift")
      setSelectedProps(buttonText);
  };

  useEffect(() => {
    if (lang === "en") {
      setData(swiftData[isValidLang(lang)].swift);
      return;
    }
    setData(swiftData[isValidLang(lang)][selectedProps]);
  }, [lang, selectedProps]);

  const copyToClipboard = async (textArr: string[]) => {
    if (copied) return;
    const text = textArr.join(" ");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Помилка копіювання: ", err);
    }
  };

  return (
    <div className={css.container}>
      {data?.button && (
        <div className={css.wrap}>
          <button
            id="inUkraine"
            onClick={selectProps}
            className={`${montserrat.className} ${selectedProps === "inUkraine" && css.isActive}  ${css.button}`}
          >
            {swiftData[isValidLang(lang)].inUkraine?.button}
          </button>
          <button
            id="swift"
            onClick={selectProps}
            className={`${montserrat.className} ${selectedProps === "swift" && css.isActive} ${css.button}`}
          >
            {swiftData[isValidLang(lang)].swift?.button}
          </button>
        </div>
      )}
      <ul>
        {data?.details.map(({ id, title, subTitle, texts, btnCopy }) => {
          return (
            <li className={css.listItem} key={id}>
              <div>
                {title && (
                  <h3 className={`${montserrat.className} ${css.listTitle}`}>
                    {title}
                  </h3>
                )}
                {subTitle && (
                  <p className={`${montserrat.className} ${css.subTitle}`}>
                    {subTitle}
                  </p>
                )}
                <ul className={`${montserrat.className} ${css.listText}`}>
                  {texts.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              </div>
              <button
                className={`${montserrat.className} ${css.btnCopy}`}
                onClick={() => copyToClipboard(texts)}
              >
                <FaRegCopy size="24px" />
                {btnCopy}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
