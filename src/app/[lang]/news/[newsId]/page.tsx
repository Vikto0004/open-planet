const News = ({ params }: { params: { newsId: string } }) => {
  const { newsId } = params; // Отримуємо id проєкта з url, потім за ним будемо робити запит на бек
  console.log(newsId);

  return (
    <>
      <h1>One News</h1>
    </>
  );
};

export default News;
