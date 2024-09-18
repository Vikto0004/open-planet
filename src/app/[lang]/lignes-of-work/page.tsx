import { unstable_setRequestLocale } from "next-intl/server";

export default async function LignesOfWork({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Lignes of work page</h1>
    </div>
  );
}
