"use client";

import { Project } from "@/query/types/projects";
import { useSelectedWork } from "@/utils/hooks";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";

import css from "./CardsLigneWorkList.module.css";

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
