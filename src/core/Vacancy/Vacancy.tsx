import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { BiShoppingBag } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { IoEllipse } from "react-icons/io5";

import vacancy from "@/db-local/vacancy.json";
import { useValidLang } from "@/utils/hooks";

import calendarIcon from "../../../public/svgs/calendar.svg";
import Container from "../Container/Container";
import Renderer from "../Renderer/Renderer";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./Vacancy.module.css";

export default function Vacancy() {
  const lang = useValidLang();
  const translate = useTranslations("JoinUs");

  return (
    <Section className={css.section}>
      <Container>
        <Title className={css.title}>{vacancy[0][lang].title}</Title>
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
            {translate("date")}
            {lang === "ua" && <span className={css.published}>року</span>}
          </p>
        </div>
        <div className={css.block}>
          <div className={css.wrapper}>
            <p className={css.text}>
              <BiShoppingBag size="20px" />
              {vacancy[0][lang].employment}
            </p>
            <p className={css.text}>
              <GrLocation size="20px" />
              {vacancy[0][lang].region}
            </p>
          </div>
          <div>
            {vacancy[0][lang].description.map((node, index) => {
              return <Renderer key={index} node={node} />;
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
