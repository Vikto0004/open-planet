import FAQ from "@/core/FAQ/FAQ";
import ProjectDetails from "@/core/ProjectDetails/ProjectDetails";
import { LangType } from "@/i18n/routing";

type PropsType = {
  params: { projectId: string; lang: LangType };
};

export default async function Project({ params }: PropsType) {
  const { projectId, lang } = params;

  return (
    <>
      <ProjectDetails projectId={projectId} lang={lang} />
      <FAQ />
    </>
  );
}
