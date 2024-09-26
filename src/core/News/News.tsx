"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import newsEn from "../../db-local/news-en.json";
import newsUa from "../../db-local/news-ua.json";
import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import NewsCard from "../NewsCard/NewsCard";
import Section from "../Section/Section";
import Title from "../Title/Title";

import style from "./News.module.css";

const News = () => {
  const translate = useTranslations("News");
  const { lang } = useParams();

  return (
    <Section>
      <Container>
        <div className={style.wrapper}>
          <Title text={translate("title")} />
          <ul className={style.list}>
            {lang === "ua"
              ? newsUa.map((card, index) => (
                  <NewsCard key={index} card={card} />
                ))
              : newsEn.map((card, index) => (
                  <NewsCard key={index} card={card} />
                ))}
          </ul>
          <CustomButton
            link={"/news"}
            text={translate("button")}
            style={style.btn}
          />
        </div>
      </Container>
    </Section>
  );
};

export default News;
