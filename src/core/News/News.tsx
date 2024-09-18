"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import CustomButton from "../CustomButton/CustomButton";
import SectionContainer from "../SectionContainer/SectionContainer";
import Title from "../Title/Title";
import NewsCard from "../NewsCard/NewsCard";
import newsUk from "../../db-local/news-uk.json";
import newsEn from "../../db-local/news-en.json";
import style from "./News.module.css";

const News = () => {
  const t = useTranslations("News");
  const { lang } = useParams();

  return (
    <SectionContainer>
      <div className={style.wrapper}>
        <Title text={t("title")} />
        <ul className={style.list}>
          {lang === "uk"
            ? newsUk.map((card) => <NewsCard key={card.cardId} card={card} />)
            : newsEn.map((card) => <NewsCard key={card.cardId} card={card} />)}
        </ul>
        <CustomButton link={"/news"} text={t("button")} />
      </div>
    </SectionContainer>
  );
};

export default News;
