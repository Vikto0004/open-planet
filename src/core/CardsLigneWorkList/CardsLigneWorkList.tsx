"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import cardsLigneWork from "@/db-local/cards-ligne-work.json";
import directionsData from "@/db-local/directions-work.json";
import { useRouter } from "@/i18n/routing";
import { useValidLang } from "@/utils/hooks";
import links from "@/utils/routes";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";
import CardsLigneWorkPaginate from "../CardsLigneWorkPaginate/CardsLigneWorkPaginate";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";

import css from "./CardsLigneWorkList.module.css";

type Data = {
  id: string;
  type: string;
  image: string;
  ua: {
    typeText: string;
    publicationData: string;
    title: string;
  };
  en: {
    typeText: string;
    publicationData: string;
    title: string;
  };
};

function paginate(array: Data[], page_size = 3, page_number = 1) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

type PropsType = {
  programType?: string;
};

export default function CardsLigneWorkList({ programType }: PropsType) {
  const translate = useTranslations("ProgramWork");
  const lang = useValidLang();

  const router = useRouter();
  const { DirectionsWork } = links;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(() =>
    Math.ceil(
      cardsLigneWork.filter(({ type }) => type === programType).length / 3,
    ),
  );

  const [selectedWork, setSelectedWork] = useState(() => {
    const data = directionsData.filter((obj) => obj[lang].type === programType);
    if (data[0]) return data[0][lang].title;
  });

  const [data, setData] = useState(() => {
    if (!programType) return cardsLigneWork.slice(0, 6);
    const newData = cardsLigneWork.filter(({ type }) => type === programType);
    return paginate(newData);
  });

  useEffect(() => {
    if (programType) {
      const newData = cardsLigneWork.filter(({ type }) => type === programType);
      setData(paginate(newData, 3, currentPage));
    } else {
      setData(cardsLigneWork.slice(0, 6));
    }

    setTotalPage(() =>
      Math.ceil(
        cardsLigneWork.filter(({ type }) => type === programType).length / 3,
      ),
    );

    const data = directionsData.filter((obj) => obj[lang].type === programType);
    if (data[0]) setSelectedWork(data[0][lang].title);
  }, [programType, currentPage, lang]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const redirectionUser = (id: string, type: string) => {
    router.push(`${DirectionsWork.allPrograms}/${type}/${id}`);
  };

  return (
    <Section>
      <Container>
        {data.length > 0 ? (
          <>
            <ul className={css.list}>
              {data.map((obj) => {
                const { id, image, type } = obj;
                return (
                  <CardsLigneWorkItem
                    key={id}
                    image={image}
                    content={{ ...obj[lang], id, type }}
                    redirectionUser={redirectionUser}
                  />
                );
              })}
            </ul>
            {totalPage > 1 && programType !== undefined && (
              <CardsLigneWorkPaginate
                totalPages={totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : lang === "en" ? (
          <h2
            className={clsx(montserrat.className, css.noProjectsTitle)}
          >{`${translate("noProjectsTitleFirstPart")} ${selectedWork} ${translate("noProjectsTitleSecondPart")}`}</h2>
        ) : (
          <h2
            className={clsx(montserrat.className, css.noProjectsTitle)}
          >{`${translate("noProjectsTitleFirstPart")} "${selectedWork}", ${translate("noProjectsTitleSecondPart")}`}</h2>
        )}
      </Container>
    </Section>
  );
}
