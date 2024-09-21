"use client";
import Container from "../Container/Container";
import { useParams } from "next/navigation";
import Section from "../Section/Section";
import Title from "../Title/Title";
import FAQListItems from "../FAQListItems/FAQListItems";
import faqUk from "../../db-local/faq-uk.json";
import faqEn from "../../db-local/faq-en.json";
import style from "./FAQ.module.css";
import { useTranslations } from "next-intl";
import { montserrat } from "../fonts";

const FAQ = () => {
  const t = useTranslations("FAQ");
  const { lang } = useParams();

  return (
    <Section>
      <Container>
        {/* <div className={style.container}> */}
        <div className={style.contentWrap}>
          <Title text={t("title")} />
          <ul className={`${montserrat.className} ${style.faqList}`}>
            {lang === "uk"
              ? faqUk.map((item) => {
                  return <FAQListItems item={item} />;
                })
              : faqEn.map((item) => <FAQListItems item={item} />)}
          </ul>
        </div>
        {/* </div> */}
      </Container>
    </Section>
  );
};

export default FAQ;
