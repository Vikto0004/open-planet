import FAQ from "@/core/FAQ/FAQ";
import NewsHome from "@/core/NewsHome/NewsHome";

export default async function News() {
  return (
    <>
      <NewsHome />
      <FAQ />
    </>
  );
}
