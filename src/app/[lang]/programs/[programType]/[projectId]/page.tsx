"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import AboutProject from "@/core/AboutProject/AboutProject";
import FAQ from "@/core/FAQ/FAQ";
import Loader from "@/core/Loader/Loader";
import PageUnderDevelopment from "@/core/PageUnderDevelopment/PageUnderDevelopment";

type PropsType = {
  params: { projectId: string };
};

const Project = ({ params }: PropsType) => {
  const { projectId } = params; // Отримуємо id проєкта з url, потім за ним будемо робити запит на бек
  console.log(projectId);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, [isMobile]);

  return isClient ? (
    !isMobile ? (
      <>
        <AboutProject />
        <FAQ />
      </>
    ) : (
      <PageUnderDevelopment />
    )
  ) : (
    <Loader />
  );
};

export default Project;
