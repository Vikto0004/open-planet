import PageUnderDevelopment from "@/core/PageUnderDevelopment/PageUnderDevelopment";

const News = ({ params }: { params: { newsId: string } }) => {
  const { newsId } = params; // Отримуємо id проєкта з url, потім за ним будемо робити запит на бек
  console.log(newsId);

  return (
    <>
      <PageUnderDevelopment />
    </>
  );
};

export default News;
