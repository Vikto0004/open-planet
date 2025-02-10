"use client";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

import { getVacancyById, postVacancyBlock } from "@/query/api/vacancy";
import { Vacancy } from "@/query/types/vacancy";

import css from "./CreateBlock.module.css";

type PropsType = {
  vacancyId: string;
  setVacancy: Dispatch<SetStateAction<Vacancy | null>>;
};

export default function CreateBlock({ vacancyId, setVacancy }: PropsType) {
  const fetchVacancyById = useCallback(async () => {
    const data = await getVacancyById(vacancyId, "ua");
    setVacancy(data);
  }, [setVacancy, vacancyId]);

  useEffect(() => {
    fetchVacancyById();
  }, [fetchVacancyById]);

  return (
    <button
      className={css.button}
      onClick={() => {
        postVacancyBlock(vacancyId);
        fetchVacancyById();
      }}
    >
      Create block
    </button>
  );
}
