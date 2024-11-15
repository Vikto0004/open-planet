"use client";

import { useEffect, useState } from "react";

import CardsLigneWorkList from "../CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "../FAQ/FAQ";
import Loader from "../Loader/Loader";
import ProgramsWork from "../ProgramsWork/ProgramsWork";

export default function TemporaryProgram() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <>
      <ProgramsWork />
      <CardsLigneWorkList />
      <FAQ />
    </>
  ) : (
    <Loader />
  );
}
