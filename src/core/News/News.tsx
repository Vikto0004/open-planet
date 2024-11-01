import { useTranslations } from "next-intl";

import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import Section from "../Section/Section";
import Title from "../Title/Title";

import style from "./News.module.css";
import NewsList from "../NewsList/NewsList";
import NewsSwiperList from "../NewsSwiperList/NewsSwiperList";
import { news } from "@/utils/routes";

const News = () => {
  const translate = useTranslations("News");

  return (
    <Section>
      <Container style={style.container}>
        <Title text={translate("title")} />
        <NewsList />
        <NewsSwiperList />
        <CustomButton
          link={news}
          text={translate("button")}
          style={style.btn}
        />
      </Container>
    </Section>
  );
};

export default News;
