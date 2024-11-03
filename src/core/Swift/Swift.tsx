"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import swiftData from "@/db-local/swift_data.json";
import { isValidLang } from "@/utils/helper";

import { montserrat } from "../fonts";
import Loader from "../Loader/Loader";
import SwiftList from "../SwiftList/SwiftList";

import css from "./Swift.module.css";

export default function Swift() {
  const { lang } = useParams();
  const [selectedProps, setSelectedProps] = useState<"inUkraine" | "swift">(
    "inUkraine",
  );

  const [data, setData] = useState(swiftData[isValidLang(lang)]);
  const [curentData, setCurentData] = useState(data[selectedProps]);
  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
  const [isClient, setIsClient] = useState(false);

  const selectProps = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const buttonText = (e.target as HTMLButtonElement).id;
    if (buttonText === "inUkraine" || buttonText === "swift")
      setSelectedProps(buttonText);
  };

  useEffect(() => {
    setData(swiftData[isValidLang(lang)]);
    setIsClient(true);

    if (lang === "en") {
      setCurentData(data.swift);
      return;
    }
    setCurentData(data[selectedProps]);
  }, [lang, selectedProps, data]);

  return (
    <div className={css.container}>
      {isClient ? (
        curentData?.button && (
          <div className={css.wrap}>
            <button
              id="inUkraine"
              onClick={selectProps}
              className={`${montserrat.className} ${selectedProps === "inUkraine" && css.isActive}  ${css.button}`}
            >
              {isMobile
                ? data.inUkraine?.button.mobile
                : data.inUkraine?.button.desctop}
            </button>
            <button
              id="swift"
              onClick={selectProps}
              className={`${montserrat.className} ${selectedProps === "swift" && css.isActive} ${css.button}`}
            >
              {isMobile
                ? data.swift?.button?.mobile
                : data.swift?.button?.desctop}
            </button>
          </div>
        )
      ) : (
        <Loader />
      )}
      {curentData?.details && <SwiftList data={curentData?.details} />}
    </div>
  );
}
