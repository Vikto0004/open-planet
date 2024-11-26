"use client";

import { Project } from "@/query/types/projects";
import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";
import css from "./CardsLigneWorkList.module.css";
import { useSelectedWork } from "@/utils/hooks";

type PropsType = {
  projects: Project[];
  programType: string;
};

export default function CardsLigneWorkList({
  projects,
  programType,
}: PropsType) {
  const selectedWork = useSelectedWork(programType);

  return (
    <ul className={css.list}>
      {projects.map((obj) => {
        return (
          <CardsLigneWorkItem
            key={obj._id}
            content={{
              obj,
              programType,
              selectedWork,
            }}
          />
        );
      })}
    </ul>
  );
}
