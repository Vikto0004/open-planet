import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useValidLang } from "@/utils/hooks";
import { support } from "@/utils/routes";

import calendarIcon from "../../../public/svgs/calendar.svg";
import AboutProjectImagesList from "../AboutProjectImagesList/AboutProjectImagesList";
import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import { inter, montserrat, oldStandardTT } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./AboutProject.module.css";
import { financProject, firstDiscr, secondSubDiscr } from "./dataBombShelter";

export default function AboutProject() {
  const translate = useTranslations("AboutProject");
  const lang = useValidLang();

  return (
    <Section className={css.section}>
      <Container>
        <h1 className={clsx(oldStandardTT.className, css.title)}>
          {translate("firstTitle")}
        </h1>
        <div className={css.dataWrapper}>
          <Image
            src={calendarIcon}
            width={25}
            height={25}
            alt="calendar icon"
          />
          <p className={clsx(inter.className, css.publicationData)}>
            {translate("date")}
          </p>
        </div>
        <Image
          width={800}
          height={564}
          src={"https://i.ibb.co/9TXtNNF/Img-school.jpg"}
          alt="Реконструкція бомбосховища для Школи №25"
          className={css.mainImg}
        />
        <ul className={css.list}>
          {firstDiscr[lang].map((text, index) => (
            <li
              key={index}
              className={clsx(montserrat.className, css.listItem)}
            >
              {text}
            </li>
          ))}
        </ul>
        <Title text={translate("secondTitle")} className={css.secondTitle} />
        <AboutProjectImagesList />
        <div className={css.wrap}>
          <h3 className={clsx(oldStandardTT.className, css.subtitle)}>
            {translate("firstSubtitle")}
          </h3>
          <p className={clsx(montserrat.className, css.listItem)}>
            {translate("firstSubDiscr")}
          </p>
          <h3 className={clsx(oldStandardTT.className, css.subtitle)}>
            {translate("secondSubtitle")}
          </h3>
          <ul className={css.listFinanc}>
            {financProject[lang].map(({ id, discr, money }) => {
              return (
                <li key={id} className={css.listFinancItem}>
                  <p
                    className={clsx(
                      oldStandardTT.className,
                      css.listFinancDiscr,
                    )}
                  >
                    {discr}
                  </p>
                  <p
                    className={clsx(montserrat.className, css.listFinancTitle)}
                  >
                    {money}
                  </p>
                </li>
              );
            })}
          </ul>
          <ul className={css.listDisrc}>
            {secondSubDiscr[lang].map((text, index) => (
              <li
                key={index}
                className={clsx(montserrat.className, css.listItem)}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <CustomButton
          className={css.button}
          text={translate("button")}
          link={support}
        />
      </Container>
    </Section>
  );
}
