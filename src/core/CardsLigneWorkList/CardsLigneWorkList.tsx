"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import cardsLigneWork from "@/db-local/cards_ligne_work.json";
import { useRouter } from "@/i18n/routing";
import links, { programQueryParam } from "@/utils/routes";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";

import css from "./CardsLigneWorkList.module.css";

export default function CardsLigneWorkList() {
  const { lang } = useParams();

  const searchParams = useSearchParams();
  const program = searchParams.get(programQueryParam);
  const router = useRouter();
  const { DirectionsWork } = links;

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

  const redirectionUser = (id: string) => {
    router.push(`${DirectionsWork.allPrograms}/${id}`);
  };

  return (
    <>
      <ul className={css.list}>
        {data.map(({ id, image, ua, en }) => {
          if (lang === "ua") {
            return (
              <CardsLigneWorkItem
                key={id}
                image={image}
                content={{ ...ua, id }}
                redirectionUser={redirectionUser}
              />
            );
          } else if (lang === "en") {
            return (
              <CardsLigneWorkItem
                key={id}
                image={image}
                content={{ ...en, id }}
                redirectionUser={redirectionUser}
              />
            );
          }
        })}
      </ul>
    </>
  );
}
