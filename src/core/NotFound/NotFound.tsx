import { useTranslations } from "next-intl";
import { FaExclamationTriangle } from "react-icons/fa";

import { Link } from "@/i18n/routing";
import { home } from "@/utils/routes";

import styles from "./NotFound.module.css";

export default function NotFound() {
  const translate = useTranslations("NotFound");
  return (
    <div className={styles.notFoundContainer}>
      <FaExclamationTriangle className={styles.icon} />
      <h1 className={styles.title}>{translate("title")}</h1>
      <p className={styles.message}>
        {translate("paragraph")}
        <Link href={home} className={styles.link}>
          {translate("link")}
        </Link>
        .
      </p>
    </div>
  );
}
