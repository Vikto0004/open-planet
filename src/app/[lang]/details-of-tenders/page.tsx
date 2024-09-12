import { unstable_setRequestLocale } from "next-intl/server";

export default async function JoinUs({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Details of Tenders page</h1>
    </div>
  );
}
