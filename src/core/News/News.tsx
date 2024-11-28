import { useTranslations } from "next-intl";

import { news } from "@/utils/routes";

import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import NewsList from "../NewsList/NewsList";
import NewsSwiperList from "../NewsSwiperList/NewsSwiperList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import style from "./News.module.css";

const News = () => {
  const translate = useTranslations("News");

  return (
    <Section>
      <Container className={style.container}>
        <Title>{translate("title")} </Title>
        <NewsList />
        <NewsSwiperList />
        <CustomButton
          link={news}
          text={translate("button")}
          className={style.btn}
        />
      </Container>
    </Section>
  );
};

export default News;
