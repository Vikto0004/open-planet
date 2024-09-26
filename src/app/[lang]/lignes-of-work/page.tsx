import { unstable_setRequestLocale } from "next-intl/server";

import ProgramWork from "@/core/ProgramWork/ProgramWork";

export default async function LignesOfWork({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <>
      <ProgramWork />
    </>
  );
}
