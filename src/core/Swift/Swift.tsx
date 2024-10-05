"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import swiftData from "@/db-local/swift_data.json";
import { isValidLang } from "@/utils/helper";

import { montserrat } from "../fonts";
import SwiftList from "../SwiftList/SwiftList";

import css from "./Swift.module.css";

export default function Swift() {
  const [selectedProps, setSelectedProps] = useState<"inUkraine" | "swift">(
    "inUkraine",
  );

  const { lang } = useParams();
  const [data, setData] = useState(() => {
    return swiftData[isValidLang(lang)][selectedProps];
  });

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
      {data?.details && <SwiftList data={data?.details} />}
    </div>
  );
}
