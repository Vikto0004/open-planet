"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useValidLang } from "@/utils/hooks";

import faq from "../../db-local/faq.json";
import Container from "../Container/Container";
import FAQListItems from "../FAQListItems/FAQListItems";
import { montserrat } from "../fonts";
import Section from "../Section/Section";
import Title from "../Title/Title";

import style from "./FAQ.module.css";

const FAQ = () => {
  const translate = useTranslations("FAQ");
  const lang = useValidLang();

  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <Section>
      <Container>
        <div className={style.contentWrap}>
          <Title>{translate("title")}</Title>
          <ul className={clsx(montserrat.className, style.faqList)}>
            {faq.map((obj) => (
              <FAQListItems
                item={obj[lang]}
                key={obj.id}
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
