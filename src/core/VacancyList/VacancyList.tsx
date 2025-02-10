import { Vacancy } from "@/query/types/vacancy";

import VacancyListItem from "../VacancyListItem/VacancyListItem";

import css from "./VacancyList.module.css";

type PropsType = {
  vacancy: Vacancy[];
};

export default function VacancyList({ vacancy }: PropsType) {
  return (
    <ul className={css.list}>
      {vacancy.map((obj) => {
        return <VacancyListItem key={obj._id} data={obj} />;
      })}
    </ul>
  );
}
