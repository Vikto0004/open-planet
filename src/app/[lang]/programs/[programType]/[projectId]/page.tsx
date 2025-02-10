import FAQ from "@/core/FAQ/FAQ";
import NotFound from "@/core/NotFound/NotFound";
import ProjectDetails from "@/core/ProjectDetails/ProjectDetails";
import { getProjectById } from "@/query/api/projects";

type PropsType = {
  params: { projectId: string };
};

export default async function Project({ params }: PropsType) {
  const { projectId } = params;

  try {
    const data = await getProjectById(projectId);
    return (
      <>
        <ProjectDetails data={data} />
        <FAQ />
      </>
    );
  } catch {
    return <NotFound />;
  }
}
