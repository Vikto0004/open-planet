"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import cardsLigneWork from "@/db-local/cards_ligne_work.json";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";

import css from "./CardsLigneWorkList.module.css";

export default function CardsLigneWorkList() {
  const { lang } = useParams();

  const searchParams = useSearchParams();
  const program = searchParams.get("program");

  const [data, setData] = useState(() => {
    if (!program) return cardsLigneWork;
    return cardsLigneWork.filter(({ type }) => type === program);
  });

  useEffect(() => {
    if (!program) {
      setData(cardsLigneWork);
      return;
    }
    const newData = cardsLigneWork.filter(({ type }) => type === program);
    setData(newData);
  }, [program]);

  return (
    <>
      <ul className={css.list}>
        {data.map(({ id, image, ua, en }) => {
          if (lang === "ua") {
            return <CardsLigneWorkItem key={id} image={image} content={ua} />;
          } else if (lang === "en") {
            return <CardsLigneWorkItem key={id} image={image} content={en} />;
          }
        })}
      </ul>
    </>
  );
}
