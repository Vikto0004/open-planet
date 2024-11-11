"use client";

import { useEffect, useState } from "react";

import CardsLigneWorkList from "@/core/CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "@/core/FAQ/FAQ";
import Loader from "@/core/Loader/Loader";
import ProgramWork from "@/core/ProgramWork/ProgramWork";

type PropsType = {
  params: { programType: string };
};

export default function ProgramType({ params }: PropsType) {
  const { programType } = params;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <>
      <ProgramWork programType={programType} />
      <CardsLigneWorkList programType={programType} />
      <FAQ />
    </>
  ) : (
    <Loader />
  );
}
