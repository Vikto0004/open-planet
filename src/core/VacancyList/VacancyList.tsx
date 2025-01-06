import vacancy from "@/db-local/vacancy.json";

import VacancyListItem from "../VacancyListItem/VacancyListItem";

import css from "./VacancyList.module.css";

export default function VacancyList() {
  return (
    <ul className={css.list}>
      {vacancy.map((obj) => {
        return <VacancyListItem key={obj.id} data={obj} />;
      })}
    </ul>
  );
}
