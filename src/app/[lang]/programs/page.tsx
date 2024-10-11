import { unstable_setRequestLocale } from "next-intl/server";

import CardsLigneWorkList from "@/core/CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "@/core/FAQ/FAQ";
import ProgramsWork from "@/core/ProgramsWork/ProgramsWork";

export default async function Programs({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <ProgramsWork />
      <CardsLigneWorkList />
      <FAQ />
    </>
  );
}
