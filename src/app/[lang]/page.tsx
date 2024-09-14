import About from "@/core/About/About";
import DirectionsWork from "@/core/DirectionsWork/DirectionsWork";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <DirectionsWork />
      <About />
    </>
  );
}
