import Container from "@/core/Container";

import { getDictionary } from "./dictionaries";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <Container>
      <div className="">{dict.title} </div>
    </Container>
  );
}
