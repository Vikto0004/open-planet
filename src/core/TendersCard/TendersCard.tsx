"use client";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";
import { requests } from "@/utils/routes";

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
  id: string;
};

export default function TendersCard({ card, isActive, id }: Props) {
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
        <Link
          href={requests + "/" + id}
          className={clsx(styles.link, !isActive && styles.disabled)}
        >
          <span> {!isMobile && translateBtn("details")}</span>
          <FiArrowUpRight className={styles.icon} />
        </Link>
      </div>
    </>
  );
}
