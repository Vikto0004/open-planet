import { getDictionary } from "../dictionaries";

export default async function Reports({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Reports page</h1>
    </div>
  );
}
