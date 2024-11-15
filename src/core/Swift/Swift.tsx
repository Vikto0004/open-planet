"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ToastContainer } from "react-toastify";

import swiftData from "@/db-local/swift-data.json";
import { useValidLang } from "@/utils/hooks";

import { montserrat } from "../fonts";
import Loader from "../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import SwiftList from "../SwiftList/SwiftList";

import css from "./Swift.module.css";

export default function Swift() {
  const lang = useValidLang();
  const [selectedProps, setSelectedProps] = useState<"inUkraine" | "swift">(
    "inUkraine",
  );

  const [data, setData] = useState(swiftData[lang]);
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
    setData(swiftData[lang]);
    setIsClient(true);

    if (lang !== "ua") {
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
              className={clsx(
                montserrat.className,
                selectedProps === "inUkraine" && css.isActive,
                css.button,
              )}
            >
              {isMobile
                ? data.inUkraine?.button.mobile
                : data.inUkraine?.button.desctop}
            </button>
            <button
              id="swift"
              onClick={selectProps}
              className={clsx(
                montserrat.className,
                selectedProps === "swift" && css.isActive,
                css.button,
              )}
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
      <ToastContainer />
    </div>
  );
}
