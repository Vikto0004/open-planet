import Hero from "@/core/Hero/Hero";
import News from "@/core/News/News";
import { unstable_setRequestLocale } from "next-intl/server";

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero />
      <News />
    </>
  );
}
