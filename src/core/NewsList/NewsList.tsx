import { useValidLang } from "@/utils/hooks";

import news from "../../db-local/news.json";
import NewsCard from "../NewsCard/NewsCard";

import style from "./NewsList.module.css";

export default function NewsList() {
  const lang = useValidLang();

  return (
    <ul className={style.list}>
      {news.map((obj) => {
        const { id, image } = obj;
        return (
          <li key={id} className={style.listItem}>
            <NewsCard card={{ id, image, ...obj[lang] }} />
          </li>
        );
      })}
    </ul>
  );
}
