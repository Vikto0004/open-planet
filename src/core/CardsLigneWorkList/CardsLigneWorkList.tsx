"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import cardsLigneWork from "@/db-local/cards_ligne_work.json";
import directionsWorkEn from "@/db-local/directions_work-en.json";
import directionsWorkUa from "@/db-local/directions_work-ua.json";
import { useRouter } from "@/i18n/routing";
import links, { programQueryParam } from "@/utils/routes";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";
import { montserrat } from "../fonts";

import css from "./CardsLigneWorkList.module.css";

export default function CardsLigneWorkList() {
  const { lang } = useParams();
  const translate = useTranslations("ProgramWork");

  const searchParams = useSearchParams();
  const program = searchParams.get(programQueryParam);
  const router = useRouter();
  const { DirectionsWork } = links;

  const [selectedWork, setselectedWork] = useState(() => {
    if (lang === "en")
      return directionsWorkEn.filter(({ url }) => url === program)[0].title;
    else if (lang === "ua")
      return directionsWorkUa.filter(({ url }) => url === program)[0].title;
  });

  const [data, setData] = useState(() => {
    if (!program) return cardsLigneWork;
    return cardsLigneWork.filter(({ type }) => type === program);
  });

  useEffect(() => {
    if (program) {
      const newData = cardsLigneWork.filter(({ type }) => type === program);
      setData(newData);
    } else {
      setData(cardsLigneWork);
    }

    if (lang === "en") {
      const data = directionsWorkEn.filter(({ url }) => url === program)[0];
      setselectedWork(data.title);
    } else if (lang === "ua") {
      const data = directionsWorkUa.filter(({ url }) => url === program)[0];
      setselectedWork(data.title);
    }
  }, [program, lang]);

  const redirectionUser = (id: string) => {
    router.push(`${DirectionsWork.allPrograms}/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
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
      ) : (
        <h2
          className={`${montserrat.className} ${css.noProjectsTitle}`}
        >{`${translate("noProjectsTitleFirstPart")} "${selectedWork}" ${translate("noProjectsTitleSecondPart")}`}</h2>
      )}
    </>
  );
}
