"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import CardsLigneWorkList from "@/core/CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "@/core/FAQ/FAQ";
import Loader from "@/core/Loader/Loader";
import PageUnderDevelopment from "@/core/PageUnderDevelopment/PageUnderDevelopment";
import ProgramWork from "@/core/ProgramWork/ProgramWork";

type PropsType = {
  params: { programType: string };
};

export default function ProgramType({ params }: PropsType) {
  const { programType } = params;
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, [isMobile]);

  return isClient ? (
    !isMobile ? (
      <>
        <ProgramWork programType={programType} />
        <CardsLigneWorkList programType={programType} />
        <FAQ />
      </>
    ) : (
      <PageUnderDevelopment />
    )
  ) : (
    <Loader />
  );
}
