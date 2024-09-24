import { unstable_setRequestLocale } from "next-intl/server";

import FAQ from "@/core/FAQ/FAQ";
import MakeContribution from "@/core/MakeContribution/MakeContribution";

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
