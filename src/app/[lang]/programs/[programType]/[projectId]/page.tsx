import FAQ from "@/core/FAQ/FAQ";
import ProjectDetails from "@/core/ProjectDetails/ProjectDetails";
import { LangType } from "@/i18n/routing";
import { getProjectById } from "@/query/api/projects";

type PropsType = {
  params: { projectId: string };
};

export default async function Project({ params }: PropsType) {
  const { projectId } = params;

  const data = await getProjectById(projectId);

  return (
    <>
      <ProjectDetails data={data} />
      <FAQ />
    </>
  );
}
