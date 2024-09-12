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
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Home page</h1>
    </div>
  );
}
