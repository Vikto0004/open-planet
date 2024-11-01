import { useLocale } from "next-intl";
import style from "./NewsList.module.css";
import newsUa from "../../db-local/news-ua.json";
import newsEn from "../../db-local/news-en.json";
import NewsCard from "../NewsCard/NewsCard";

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
