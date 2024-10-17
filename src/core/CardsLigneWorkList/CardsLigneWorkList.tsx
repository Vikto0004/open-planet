"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import cardsLigneWork from "@/db-local/cards_ligne_work.json";
import directionsWorkEn from "@/db-local/directions_work-en.json";
import directionsWorkUa from "@/db-local/directions_work-ua.json";
import { useRouter } from "@/i18n/routing";
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
  const { lang } = useParams();
  const translate = useTranslations("ProgramWork");

  const router = useRouter();
  const { DirectionsWork } = links;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(() =>
    Math.ceil(
      cardsLigneWork.filter(({ type }) => type === programType).length / 3,
    ),
  );

  const [selectedWork, setSelectedWork] = useState(() => {
    if (lang === "en")
      return directionsWorkEn.filter(({ url }) => url === programType)[0]
        ?.title;
    else if (lang === "ua")
      return directionsWorkUa.filter(({ url }) => url === programType)[0]
        ?.title;
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

    if (lang === "en") {
      const data = directionsWorkEn.filter(({ url }) => url === programType)[0];
      setSelectedWork(data?.title);
    } else if (lang === "ua") {
      const data = directionsWorkUa.filter(({ url }) => url === programType)[0];
      setSelectedWork(data?.title);
    }
  }, [programType, lang, currentPage]);

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
              {data.map(({ id, image, ua, en, type }) => {
                if (lang === "ua") {
                  return (
                    <CardsLigneWorkItem
                      key={id}
                      image={image}
                      content={{ ...ua, id, type }}
                      redirectionUser={redirectionUser}
                    />
                  );
                } else if (lang === "en") {
                  return (
                    <CardsLigneWorkItem
                      key={id}
                      image={image}
                      content={{ ...en, id, type }}
                      redirectionUser={redirectionUser}
                    />
                  );
                }
              })}
            </ul>
            {totalPage > 1 && programType !== undefined && (
              <CardsLigneWorkPaginate
                totalPages={totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <h2
            className={`${montserrat.className} ${css.noProjectsTitle}`}
          >{`${translate("noProjectsTitleFirstPart")} "${selectedWork}" ${translate("noProjectsTitleSecondPart")}`}</h2>
        )}
      </Container>
    </Section>
  );
}
