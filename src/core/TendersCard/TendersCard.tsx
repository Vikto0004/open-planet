"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import { montserrat } from "../fonts";

import styles from "./TendersCard.module.css";

interface Card {
  cardTitle: string;
  publicationData: string;
  relevant: string;
}

type Props = {
  card: Card;
  isActive: boolean;
};

export default function TendersCard({ card, isActive }: Props) {
  const translatePublished = useTranslations("PublishInfo");
  const translateBtn = useTranslations("Buttons");
  const { cardTitle, publicationData, relevant } = card;
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

  const handleDownload = () => {};

  return (
    <>
      <div
        className={clsx(
          montserrat.className,
          styles.card,
          !isActive && styles.disabled,
        )}
      >
        <div className={styles.info}>
          <p className={styles.textPub}>
            {`${translatePublished("published")}: ${publicationData}`}
          </p>
          <h3 className={styles.title}>{cardTitle}</h3>
          <p className={styles.textRel}>
            {`${translatePublished("relevant")}: ${relevant}`}
          </p>
        </div>
        <button
          className={clsx(
            montserrat.className,
            styles.btn,
            !isActive && styles.disabled,
          )}
          onClick={handleDownload}
        >
          {!isMobile && translateBtn("details")}
          <div className={styles.iconBox}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524Z"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 1.33333C0 0.596954 0.596954 0 1.33333 0H14.6667C15.403 0 16 0.596954 16 1.33333V14.6667C16 15.403 15.403 16 14.6667 16C13.9303 16 13.3333 15.403 13.3333 14.6667V2.66667H1.33333C0.596954 2.66667 0 2.06971 0 1.33333Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}
