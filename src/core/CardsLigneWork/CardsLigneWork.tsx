"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { toast, ToastContainer } from "react-toastify";

import { getProjectsPaginated } from "@/query/api/projects";
import { Project } from "@/query/types/projects";
import { useSelectedWork, useValidLang } from "@/utils/hooks";

import CardsLigneWorkList from "../CardsLigneWorkList/CardsLigneWorkList";
import CardsLigneWorkPaginate from "../CardsLigneWorkPaginate/CardsLigneWorkPaginate";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";

import css from "./CardsLigneWork.module.css";

type PropsType = {
  programType: string;
};

export default function CardsLigneWork({ programType }: PropsType) {
  const lang = useValidLang();
  const translate = useTranslations("ProgramWork");
  const selectedWork = useSelectedWork(programType);
  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const limitPage = 3;

  const fetchProjectsPaginated = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        const data = await getProjectsPaginated(
          currentPage,
          limitPage,
          lang,
          programType,
        );

        setProjects((prevProjects) =>
          isMobile && page > 1
            ? [...prevProjects, ...newProjects]
            : newProjects,
        );
        setTotalPage(Math.ceil(data.data.totalWorkDirections / limitPage));
      } catch (error) {
        typeof error === "string" && toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [limitPage, lang, programType, isMobile],
  );

  useEffect(() => {
    setProjects([]);
    setCurrentPage(1);
    fetchProjectsPaginated(1);
  }, [isMobile, fetchProjectsPaginated]);

  const handleLoadMore = () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    fetchProjectsPaginated(currentPage);
  }, [currentPage, fetchProjectsPaginated]);

  if (isLoading) return <Loader />;

  return (
    <Section>
      <Container>
        {projects && projects.length ? (
          <>
            <CardsLigneWorkList projects={projects} programType={programType} />
            {totalPage > 1 && programType !== undefined && (
              <CardsLigneWorkPaginate
                totalPages={totalPage}
                setCurrentPage={setCurrentPage}
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
      <ToastContainer />
    </Section>
  );
}
