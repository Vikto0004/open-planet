import { useValidLang } from "@/utils/hooks";

import news from "../../db-local/news.json";
import NewsCard from "../NewsCard/NewsCard";
import css from "./NewsHomeList.module.css";

export default function NewsHomeList() {
  const lang = useValidLang();

  return (
    <ul className={css.list}>
      {news.map((obj) => {
        const { id, image } = obj;
        return (
          <li key={id} className={css.listItem}>
            <NewsCard card={{ id, image, ...obj[lang] }} />
          </li>
        );
      })}
    </ul>
  );
}
