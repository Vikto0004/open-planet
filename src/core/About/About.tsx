import { useTranslations } from "next-intl";
import AboutList from "../AboutList/AboutList";
import Container from "../Container/Container";
import Section from "../Section/Section";
import Title from "../Title/Title";

import { montserrat } from "../fonts";
import css from "./About.module.css";
import CooperationList from "../CooperationList/CooperationList";

export default function About() {
  const translate = useTranslations("About");

  return (
    <>
      <Section>
        <Container>
          <Title text={translate("title")} />
          <p className={`${montserrat.className} ${css.discription}`}>
            {translate("description")}
          </p>
          <h3 className={`${montserrat.className} ${css.title}`}>
            {translate("ourValues")}
          </h3>
          <AboutList />
        </Container>
      </Section>
      <Section>
        <Container>
          <h3 className={`${montserrat.className} ${css.title}`}>
            {translate("cooperation")}
          </h3>
          <CooperationList />
        </Container>
      </Section>
    </>
  );
}
