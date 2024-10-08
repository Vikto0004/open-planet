import AboutProject from "@/core/AboutProject/AboutProject";

const Project = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params; // Отримуємо id проєкта з url, потім за ним будемо робити запит на бек

  return (
    <>
      <AboutProject />
    </>
  );
};

export default Project;
