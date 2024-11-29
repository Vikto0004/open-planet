import PageUnderDevelopment from "@/core/PageUnderDevelopment/PageUnderDevelopment";

const NewsPage = ({ params }: { params: { newsId: string } }) => {
  const { newsId } = params; // Отримуємо id проєкта з url, потім за ним будемо робити запит на бек
  console.log(newsId);

  return (
    <>
      <PageUnderDevelopment />
    </>
  );
};

export default NewsPage;
