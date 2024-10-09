import AboutProject from "@/core/AboutProject/AboutProject";
import FAQ from "@/core/FAQ/FAQ";

const Project = ({ params }: { params: { projectId: string } }) => {
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
