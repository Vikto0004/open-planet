"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import { montserrat } from "../fonts";

import styles from "./DocRepCard.module.css";

interface Card {
  cardTitle: string;
  publicationData: string;
  link: string;
}

type Props = {
  card: Card;
  isActive: boolean;
};

export default function DocRepCard({ card, isActive }: Props) {
  const translate = useTranslations("Documents");
  const { cardTitle, publicationData, link } = card;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const verifyDevice = () => {
      if (window.innerWidth < 1440) {
        setIsMobile(true); // mobile devices
      } else {
        setIsMobile(false); // desktop
      }
    };

    verifyDevice();

    window.addEventListener("resize", verifyDevice);
    return () => {
      window.removeEventListener("resize", verifyDevice);
    };
  }, []);

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = link;
    const fileName =
      link.split("/").length > 0
        ? link.split("/").pop()?.replace(".pdf", "")
        : "";

    // downloadLink.download = `${cardTitle}.pdf`;
    downloadLink.download = `${fileName}.pdf`;
    downloadLink.click();
  };

  return (
    <>
      <div
        className={clsx(
          montserrat.className,
          styles.card,
          !isActive && styles.disabled,
        )}
      >
        <p className={styles.text}>
          {isMobile
            ? publicationData
            : `${translate("published")}: ${publicationData}`}
        </p>
        <h3 className={styles.title}>{cardTitle}</h3>
        <button
          className={clsx(
            montserrat.className,
            styles.btn,
            !isActive && styles.disabled,
          )}
          onClick={handleDownload}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className={styles.icon}
          >
            <path d="M24 24v4h-16v-4h-2v4c0 0.53 0.211 1.039 0.586 1.414s0.884 0.586 1.414 0.586h16c0.53 0 1.039-0.211 1.414-0.586s0.586-0.884 0.586-1.414v-4h-2z"></path>
            <path d="M21 21l-1.414-1.414-2.586 2.586v-8.172h-2v8.172l-2.586-2.586-1.414 1.414 5 5 5-5z"></path>
            <path d="M28 4v-2h-6v10h2v-4h3v-2h-3v-2h4z"></path>
            <path d="M17 12h-4v-10h4c0.795 0.001 1.558 0.317 2.12 0.88s0.879 1.325 0.88 2.12v4c-0.001 0.795-0.317 1.558-0.88 2.12s-1.325 0.879-2.12 0.88zM15 10h2c0.265-0 0.519-0.106 0.707-0.293s0.293-0.442 0.293-0.707v-4c-0-0.265-0.106-0.519-0.293-0.707s-0.442-0.293-0.707-0.293h-2v6z"></path>
            <path d="M9 2h-5v10h2v-3h3c0.53-0.001 1.038-0.212 1.413-0.587s0.586-0.883 0.587-1.413v-3c-0.001-0.53-0.211-1.039-0.587-1.414s-0.883-0.586-1.413-0.586zM6 7v-3h3l0.001 3h-3.001z"></path>
          </svg>
          {!isMobile && translate("btnName")}
        </button>
      </div>
    </>
  );
}