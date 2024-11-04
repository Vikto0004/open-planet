import clsx from "clsx";
import { useTranslations } from "next-intl";

import AboutList from "../AboutList/AboutList";
import Container from "../Container/Container";
import CooperationList from "../CooperationList/CooperationList";
import { montserrat, oldStandardTT } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./About.module.css";

export default function About() {
  const translate = useTranslations("About");

  return (
    <>
      <Section className={css.section}>
        <Container>
          <Title text={translate("title")} className={css.title} />
          <p className={clsx(montserrat.className, css.discription)}>
            {translate("description")}
          </p>
          <h3 className={clsx(oldStandardTT.className, css.titleOurValues)}>
            {translate("ourValues")}
          </h3>
          <AboutList />
        </Container>
      </Section>
      <Section>
        <Container>
          <h3 className={clsx(oldStandardTT.className, css.titleOurValues)}>
            {translate("cooperation")}
          </h3>
          <CooperationList />
        </Container>
      </Section>
    </>
  );
}
