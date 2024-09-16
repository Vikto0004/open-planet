import About from "@/core/About/About";
import DirectionsWork from "@/core/DirectionsWork/DirectionsWork";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <DirectionsWork />
      <About />
    </>
  );
}
