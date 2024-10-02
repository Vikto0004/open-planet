import { unstable_setRequestLocale } from "next-intl/server";

import CardsLigneWork from "@/core/CardsLigneWork/CardsLigneWork";
import FAQ from "@/core/FAQ/FAQ";
import ProgramWork from "@/core/ProgramWork/ProgramWork";

export default async function LignesOfWork({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <ProgramWork />
      <CardsLigneWork />
      <FAQ />
    </>
  );
}
