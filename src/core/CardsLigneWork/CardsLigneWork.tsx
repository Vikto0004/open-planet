"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { useProjectsPaginated } from "@/query/queries/projects";
import { Project } from "@/query/types/projects";
import { useSelectedWork, useValidLang } from "@/utils/hooks";

import CardsLigneWorkPaginate from "../CardsLigneWorkPaginate/CardsLigneWorkPaginate";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";

import css from "./CardsLigneWork.module.css";
import CardsLigneWorkList from "../CardsLigneWorkList/CardsLigneWorkList";
import { getProjectsPaginated } from "@/query/api/projects";
import { toast, ToastContainer } from "react-toastify";

type PropsType = {
  programType: string;
};

export default function CardsLigneWork({ programType }: PropsType) {
  const lang = useValidLang();
  const translate = useTranslations("ProgramWork");
  const selectedWork = useSelectedWork(programType);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const limitPage = 3;

  useEffect(() => {
    const fetchProjectsPaginated = async () => {
      setIsLoading(true);
      try {
        const data = await getProjectsPaginated(
          currentPage,
          limitPage,
          lang,
          programType,
        );

        setProjects(data.data.workDirections);
        setTotalPage(Math.ceil(data.data.totalWorkDirections / limitPage));
      } catch (error) {
        typeof error === "string" && toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectsPaginated();
  }, []);

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
