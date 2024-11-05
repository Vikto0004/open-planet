import CardsLigneWorkList from "@/core/CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "@/core/FAQ/FAQ";
import ProgramsWork from "@/core/ProgramsWork/ProgramsWork";

export default async function Programs() {
  return (
    <>
      <ProgramsWork />
      <CardsLigneWorkList />
      <FAQ />
    </>
  );
}
