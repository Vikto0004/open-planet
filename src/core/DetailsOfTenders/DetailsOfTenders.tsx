"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";

import { getTendersPaginated } from "@/query/api/tenders";
import { Tenders } from "@/query/types/tenders";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Loader from "../Loader/Loader";
import Paginate from "../Paginate/Paginate";
import Section from "../Section/Section";
import TendersList from "../TendersList/TendersList";
import Title from "../Title/Title";

import styles from "./DetailsOfTenders.module.css";

export default function DetailsOfTenders() {
  const translate = useTranslations("DetailsOfTenders");

  const lang = useValidLang();
  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [tenders, setTenders] = useState<Tenders[]>([]);
  const [limitPage, setLimitPage] = useState(6);

  const fetchTendersPaginated = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const data = await getTendersPaginated(page, limitPage, lang);

        const newTenders = data.tenders;

        setTenders((prevTenders) =>
          isMobile && page > 1 ? [...prevTenders, ...newTenders] : newTenders,
        );
        setTotalPage(Math.ceil(data.totalTenders / limitPage));
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
    fetchTendersPaginated(currentPage);
  }, [isMobile, fetchTendersPaginated, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  return (
    <>
      <Section className={clsx(montserrat.className, styles.section)}>
        <Container>
          <Title className={styles.title}>{translate("title")}</Title>
          {isLoading ? (
            <Loader />
          ) : tenders.length ? (
            <>
              <TendersList data={tenders} />
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
            <h2 className={styles.noTenders}>{translate("noTenders")}</h2>
          )}
        </Container>
      </Section>
    </>
  );
}
