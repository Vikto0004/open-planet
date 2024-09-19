import { unstable_setRequestLocale } from "next-intl/server";

export default async function PublicOffer({
  params: { lang },
}: {
  params: { lang: string };
}) {
  unstable_setRequestLocale(lang);

  return (
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Public Offer page</h1>
    </div>
  );
}
