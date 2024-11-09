"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import CardsLigneWorkList from "../CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "../FAQ/FAQ";
import Loader from "../Loader/Loader";
import PageUnderDevelopment from "../PageUnderDevelopment/PageUnderDevelopment";
import ProgramsWork from "../ProgramsWork/ProgramsWork";

export default function TemporaryProgram() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, [isMobile]);

  return isClient ? (
    !isMobile ? (
      <>
        <ProgramsWork />
        <CardsLigneWorkList />
        <FAQ />
      </>
    ) : (
      <PageUnderDevelopment />
    )
  ) : (
    <Loader />
  );
}
