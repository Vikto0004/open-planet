import FAQ from "@/core/FAQ/FAQ";
import NotFound from "@/core/NotFound/NotFound";
import VacancyById from "@/core/VacancyById/VacancyById";
import { LangType } from "@/i18n/routing";
import { getVacancyById } from "@/query/api/vacancy";

type PropsType = {
  params: { vacancyId: string; lang: LangType };
};

export default async function VacancyPage({ params }: PropsType) {
  const { vacancyId, lang } = params;

  try {
    const vacancy = await getVacancyById(vacancyId, lang);
    return (
      <>
        <VacancyById vacancy={vacancy} />
        <FAQ />
      </>
    );
  } catch {
    return <NotFound />;
  }
}
