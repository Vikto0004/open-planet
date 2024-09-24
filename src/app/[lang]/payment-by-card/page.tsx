import { unstable_setRequestLocale } from "next-intl/server";
import MakeContribution from "@/core/MakeContribution/MakeContribution";
import FAQ from "@/core/FAQ/FAQ";

export default async function PaymentByCard({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <MakeContribution />
      <FAQ />
    </>
  );
}
