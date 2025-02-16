"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

import { getVacancyPaginated } from "@/query/api/vacancy";
import { Vacancy } from "@/query/types/vacancy";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import Loader from "../Loader/Loader";
import Paginate from "../Paginate/Paginate";
import Section from "../Section/Section";
import Title from "../Title/Title";
import VacancyList from "../VacancyList/VacancyList";

import css from "./JoinUs.module.css";

export default function JoinUs() {
  const translate = useTranslations("JoinUs");
  const lang = useValidLang();
  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [vacancy, setVacancy] = useState<Vacancy[]>([]);
  const [limitPage, setLimitPage] = useState(6);

  const fetchVacancyPaginated = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const data = await getVacancyPaginated(page, limitPage, lang);

        const newVacancy = data.vacancy;

        setVacancy((prevVacancy) =>
          isMobile && page > 1 ? [...prevVacancy, ...newVacancy] : newVacancy,
        );
        setTotalPage(Math.ceil(data.totalVacancy / limitPage));
      } catch (error) {
        if (typeof error === "string") toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [limitPage, lang, isMobile],
  );

  useEffect(() => {
    isMobile ? setLimitPage(3) : setLimitPage(6);
    fetchVacancyPaginated(currentPage);
  }, [isMobile, fetchVacancyPaginated, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  return (
    <Section className={css.section}>
      <Container>
        <div className={css.container}>
          <div className={css.wrap}>
            <Title className={css.title}>{translate("title")}</Title>
            <p className={css.description}>{translate("description")}</p>
          </div>
          <Image
            src={
              "http://res.cloudinary.com/debgf7wwi/image/upload/v1738323958/open-planet-image/the-join-us.jpg"
            }
            height={512}
            width={420}
            alt="The join team"
            className={css.image}
          />
          <p className={css.descriptionMob}>{translate("description")}</p>
        </div>
        {isLoading ? (
          <Loader />
        ) : vacancy.length ? (
          <>
            <VacancyList vacancy={vacancy} />
            {totalPage > 1 && (
              <Paginate
                totalPages={totalPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                loadMore={handleLoadMore}
              />
            )}
          </>
        ) : (
          <h2 className={css.noVacancies}>{translate("noVacancies")}</h2>
        )}
      </Container>
    </Section>
  );
}
