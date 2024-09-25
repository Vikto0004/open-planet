"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import newsEn from "../../db-local/news-en.json";
import newsUk from "../../db-local/news-uk.json";
import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import NewsCard from "../NewsCard/NewsCard";
import Section from "../Section/Section";
import Title from "../Title/Title";

import style from "./News.module.css";

const News = () => {
  const t = useTranslations("News");
  const { lang } = useParams();

  return (
    <Section>
      <Container>
        <Title text={t("title")} />
        <ul className={style.list}>
          {lang === "uk"
            ? newsUk.map((card, index) => <NewsCard key={index} card={card} />)
            : newsEn.map((card, index) => <NewsCard key={index} card={card} />)}
        </ul>
        <CustomButton link={"/news"} text={t("button")} style={style.button} />
      </Container>
    </Section>
  );
};

export default News;
