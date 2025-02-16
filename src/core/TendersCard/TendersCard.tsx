import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/routing";
import { Tenders } from "@/query/types/tenders";
import { formatDate } from "@/utils/helper";
import { useValidLang } from "@/utils/hooks";
import { requests } from "@/utils/routes";

import { montserrat } from "../fonts";

import styles from "./TendersCard.module.css";

type Props = {
  card: Tenders;
};

export default function TendersCard({ card }: Props) {
  const translatePublished = useTranslations("PublishInfo");
  const translateBtn = useTranslations("Buttons");
  const lang = useValidLang();

  const [isMobile, setIsMobile] = useState(false);
  const { createdAt, _id } = card;

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
    <li className={styles.item}>
      <div className={clsx(montserrat.className, styles.card)}>
        <div className={styles.info}>
          <p className={styles.textPub}>
            {`${translatePublished("published")} ${formatDate(createdAt, lang)}`}
          </p>
          <h3 className={styles.title}>{card[lang].title}</h3>
          <p className={styles.textRel}>{card[lang].relevant}</p>
        </div>
        <Link href={requests + "/" + _id} className={styles.link}>
          <span> {!isMobile && translateBtn("details")}</span>
          <FiArrowUpRight className={styles.icon} />
        </Link>
      </div>
    </li>
  );
}
