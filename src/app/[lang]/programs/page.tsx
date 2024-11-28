import FAQ from "@/core/FAQ/FAQ";
import LatestProjects from "@/core/LatestProjects/LatestProjects";
import ProgramsAccordion from "@/core/ProgramsAccordion/ProgramsAccordion";
import ProgramsWork from "@/core/ProgramsWork/ProgramsWork";
import { LangType } from "@/i18n/routing";
import { getLatestProjects } from "@/query/api/projects";

type PropsType = {
  params: { lang: LangType };
};

export default async function Programs({ params }: PropsType) {
  const { lang } = params;
  const projects = await getLatestProjects(6, lang);

  return (
    <>
      <ProgramsAccordion />
      <ProgramsWork />
      <LatestProjects projects={projects} />
      <FAQ />
    </>
  );
}
