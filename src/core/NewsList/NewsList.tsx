import { useLocale } from "next-intl";

import newsEn from "../../db-local/news-en.json";
import newsUa from "../../db-local/news-ua.json";
import NewsCard from "../NewsCard/NewsCard";

import style from "./NewsList.module.css";

export default function NewsList() {
  const lang = useLocale();

  return (
    <ul className={style.list}>
      {lang === "ua"
        ? newsUa.map((card, index) => (
            <li key={card.cardId} className={style.listItem}>
              <NewsCard key={index} card={card} />
            </li>
          ))
        : newsEn.map((card, index) => (
            <li key={card.cardId} className={style.listItem}>
              <NewsCard key={index} card={card} />
            </li>
          ))}
    </ul>
  );
}
