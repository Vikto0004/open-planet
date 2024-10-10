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
import CardsLigneWorkPaginate from "../CardsLigneWorkPaginate/CardsLigneWorkPaginate";
import { montserrat } from "../fonts";

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

export default function CardsLigneWorkList() {
  const { lang } = useParams();
  const translate = useTranslations("ProgramWork");

  const searchParams = useSearchParams();
  const program = searchParams.get(programQueryParam);
  const router = useRouter();
  const { DirectionsWork } = links;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(() =>
    Math.ceil(cardsLigneWork.filter(({ type }) => type === program).length / 3),
  );

  const [selectedWork, setselectedWork] = useState(() => {
    if (lang === "en")
      return directionsWorkEn.filter(({ url }) => url === program)[0]?.title;
    else if (lang === "ua")
      return directionsWorkUa.filter(({ url }) => url === program)[0]?.title;
  });

  const [data, setData] = useState(() => {
    if (!program) return cardsLigneWork.slice(0, 6);
    const newData = cardsLigneWork.filter(({ type }) => type === program);
    return paginate(newData);
  });

  useEffect(() => {
    if (program) {
      const newData = cardsLigneWork.filter(({ type }) => type === program);
      setData(paginate(newData, 3, currentPage));
    } else {
      setData(cardsLigneWork.slice(0, 6));
    }

    setTotalPage(() =>
      Math.ceil(
        cardsLigneWork.filter(({ type }) => type === program).length / 3,
      ),
    );

    if (lang === "en") {
      const data = directionsWorkEn.filter(({ url }) => url === program)[0];
      setselectedWork(data?.title);
    } else if (lang === "ua") {
      const data = directionsWorkUa.filter(({ url }) => url === program)[0];
      setselectedWork(data?.title);
    }
  }, [program, lang, currentPage]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const redirectionUser = (id: string) => {
    router.push(`${DirectionsWork.allPrograms}/${id}`);
  };

  return (
    <>
      {data.length > 0 ? (
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
          {totalPage > 1 && program !== undefined && (
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
    </>
  );
}
