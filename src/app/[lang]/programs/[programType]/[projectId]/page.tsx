import AboutProject from "@/core/AboutProject/AboutProject";
import FAQ from "@/core/FAQ/FAQ";

type PropsType = {
  params: { projectId: string };
};

const Project = ({ params }: PropsType) => {
  const { projectId } = params; // Отримуємо id проєкта з url, потім за ним будемо робити запит на бек
  console.log(projectId);

  return (
    <>
      <AboutProject />
      <FAQ />
    </>
  );
};

export default Project;
