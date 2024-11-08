"use client";

import { useMediaQuery } from "react-responsive";
import CardsLigneWorkList from "../CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "../FAQ/FAQ";
import ProgramsWork from "../ProgramsWork/ProgramsWork";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import PageUnderDevelopment from "../PageUnderDevelopment/PageUnderDevelopment";

export default function TemporaryProgram() {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, []);

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
