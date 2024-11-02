"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import faqEn from "../../db-local/faq-en.json";
import faqua from "../../db-local/faq-ua.json";
import Container from "../Container/Container";
import FAQListItems from "../FAQListItems/FAQListItems";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import style from "./FAQ.module.css";

const FAQ = () => {
  const t = useTranslations("FAQ");
  const { lang } = useParams();

  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <Section>
      <Container>
        <div className={style.contentWrap}>
          <Title text={t("title")} />
          <ul className={`${montserrat.className} ${style.faqList}`}>
            {lang === "ua"
              ? faqua.map((item, index) => {
                  return (
                    <FAQListItems
                      item={item}
                      key={index}
                      setExpanded={setExpanded}
                      expanded={expanded}
                    />
                  );
                })
              : faqEn.map((item, index) => (
                  <FAQListItems
                    item={item}
                    key={index}
                    setExpanded={setExpanded}
                    expanded={expanded}
                  />
                ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
