import { unstable_setRequestLocale } from "next-intl/server";
import Hero from "@/core/Hero/Hero";
import DirectionsWork from "@/core/DirectionsWork/DirectionsWork";
import News from "@/core/News/News";
import About from "@/core/About/About";
import FAQ from "@/core/FAQ/FAQ";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <Hero />
      <DirectionsWork />
      <News />
      <About />
      <FAQ />
    </>
  );
}
