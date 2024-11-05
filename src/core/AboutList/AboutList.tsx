import ourValues from "@/db-local/our-values.json";
import { useValidLang } from "@/utils/hooks";

import AboutListItem from "../AboutListItem/AboutListItem";

import css from "./AboutList.module.css";

export default function AboutList() {
  const lang = useValidLang();

  return (
    <ul className={css.list}>
      {ourValues.map((obj) => (
        <AboutListItem
          key={obj.id}
          title={obj[lang].title}
          description={obj[lang].description}
          image={obj.image}
        />
      ))}
    </ul>
  );
}
