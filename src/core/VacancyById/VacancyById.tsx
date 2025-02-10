import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { BiShoppingBag } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { IoEllipse } from "react-icons/io5";

import { langs, LangType } from "@/i18n/routing";
import { Vacancy } from "@/query/types/vacancy";
import { formatDate } from "@/utils/helper";
import { useValidLang } from "@/utils/hooks";

import calendarIcon from "../../../public/svgs/calendar.svg";
import Container from "../Container/Container";
import Renderer from "../Renderer/Renderer";
import SaveTitleForBreadcrumbs from "../SaveTitleForBreadcrumbs/SaveTitleForBreadcrumbs";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./VacancyById.module.css";

type PropsType = {
  vacancy: Vacancy;
};

export default function VacancyById({ vacancy }: PropsType) {
  const lang = useValidLang();
  const translate = useTranslations("JoinUs");

  const titles = langs.reduce<Record<LangType, string>>(
    (acc, lang) => {
      acc[lang] = vacancy[lang]?.title;
      return acc;
    },
    {} as Record<LangType, string>,
  );

  return (
    <Section className={css.section}>
      <Container>
        <Title className={css.title}>{vacancy[lang].title}</Title>
        <div className={css.wrap}>
          <p className={clsx(css.paragraph, css.vacancyDiscr)}>
            <IoEllipse className={css.ioEllipse} /> {translate("vacancy")}
          </p>
          <p className={clsx(css.paragraph, css.joinUsDiscr)}>
            <IoEllipse className={css.ioEllipse} /> {translate("title")}
          </p>
          <p className={css.paragraph}>
            <Image
              src={calendarIcon}
              width={16}
              height={16}
              alt="calendar icon"
              loading="lazy"
              className={css.calendarIcon}
            />
            <span className={css.published}>{translate("published")}</span>
            {formatDate(vacancy.createdAt, lang)}
          </p>
        </div>
        <div className={css.block}>
          <div className={css.wrapper}>
            <p className={css.text}>
              <BiShoppingBag size="20px" />
              {vacancy[lang].employment}
            </p>
            <p className={css.text}>
              <GrLocation size="20px" />
              {vacancy[lang].region}
            </p>
          </div>
          <div>
            {vacancy[lang].description.map((node, index) => {
              return <Renderer key={index} node={node} />;
            })}
          </div>
        </div>
        <SaveTitleForBreadcrumbs titleKey="vacancyTitle" titles={titles} />
      </Container>
    </Section>
  );
}
