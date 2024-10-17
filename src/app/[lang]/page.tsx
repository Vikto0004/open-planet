import { unstable_setRequestLocale } from "next-intl/server";

import About from "@/core/About/About";
import DirectionsWork from "@/core/DirectionsWork/DirectionsWork";
// import FAQ from "@/core/FAQ/FAQ";
// import Hero from "@/core/Hero/Hero";
// import News from "@/core/News/News";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      {/* <Hero /> */}
      <DirectionsWork />
      {/* <News /> */}
      <About />
      {/* <FAQ /> */}
    </>
  );
}
