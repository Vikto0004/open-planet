import FAQ from "@/core/FAQ/FAQ";
import NotFound from "@/core/NotFound/NotFound";
import Tender from "@/core/Tender/Tender";
import { LangType } from "@/i18n/routing";
import { getTenderById } from "@/query/api/tenders";

type PropsType = {
  params: { tenderId: string; lang: LangType };
};

export default async function TenderPage({ params }: PropsType) {
  const { tenderId, lang } = params;

  try {
    const tender = await getTenderById(tenderId, lang);

    return (
      <>
        <Tender tender={tender} />
        <FAQ />
      </>
    );
  } catch {
    return <NotFound />;
  }
}
