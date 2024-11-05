import CardsLigneWorkList from "@/core/CardsLigneWorkList/CardsLigneWorkList";
import FAQ from "@/core/FAQ/FAQ";
import ProgramWork from "@/core/ProgramWork/ProgramWork";

type PropsType = {
  params: { programType: string };
};

export default function ProgramType({ params }: PropsType) {
  const { programType } = params;

  return (
    <>
      <ProgramWork programType={programType} />
      <CardsLigneWorkList programType={programType} />
      <FAQ />
    </>
  );
}
