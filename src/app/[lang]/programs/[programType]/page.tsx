import CardsLigneWorkList from "@/core/CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "@/core/FAQ/FAQ";
import ProgramWork from "@/core/ProgramWork/ProgramWork";

export default function ProgramType({
  params,
}: {
  params: { programType: string };
}) {
  const { programType } = params;

  return (
    <>
      <ProgramWork programType={programType} />
      <CardsLigneWorkList programType={programType} />
      <FAQ />
    </>
  );
}
