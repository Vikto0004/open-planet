//lignes-of-work
import { getDictionary } from "../dictionaries";

export default async function LignesOfWork({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div style={{ padding: "200px" }}>
      <h1>Welcome to Lignes of work page</h1>
    </div>
  );
}
