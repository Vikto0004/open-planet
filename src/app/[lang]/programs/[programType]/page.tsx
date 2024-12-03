import CardsLigneWork from "@/core/CardsLigneWork/CardsLigneWork";
import FAQ from "@/core/FAQ/FAQ";
import ProgramsAccordion from "@/core/ProgramsAccordion/ProgramsAccordion";
import ProgramWork from "@/core/ProgramWork/ProgramWork";

type PropsType = {
  params: { programType: string };
};

export default async function ProgramType({ params }: PropsType) {
  const { programType } = params;

  return (
    <>
      <ProgramsAccordion />
      <ProgramWork programType={programType} />
      <CardsLigneWork programType={programType} />
      <FAQ />
    </>
  );
}
