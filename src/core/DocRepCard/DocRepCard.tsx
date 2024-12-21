"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import styles from "./DocRepCard.module.css";

interface Card {
  cardTitle: string;
  publicationData: string;
  btnName: string;
  link: string;
}

type Props = {
  card: Card;
};

export default function DocRepCard({ card }: Props) {
  const translate = useTranslations("Published");
  const { cardTitle, publicationData, btnName, link } = card;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const verifyDevice = () => {
      if (window.innerWidth < 1240) {
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
    downloadLink.download = `${cardTitle}.pdf`;
    downloadLink.click();
  };

  return (
    <>
      <div className={styles.card}>
        <p>
          {isMobile
            ? publicationData
            : `${translate("title")}: ${publicationData}`}
        </p>
        <h3 className={styles.title}>{cardTitle}</h3>
        <button className={styles.btn} onClick={handleDownload}>
          <Image
            src="/svgs/generate-pdf.svg"
            alt="Download"
            width={32}
            height={32}
            className={styles.icon}
          />
          {!isMobile && btnName}
        </button>
      </div>
    </>
  );
}
