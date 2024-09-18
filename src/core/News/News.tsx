"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import CustomButton from "../CustomButton/CustomButton";
import SectionContainer from "../SectionContainer/SectionContainer";
import newsUk from "../../db-local/news-uk.json";
import newsEn from "../../db-local/news-en.json";
import cardImages from "../../../public/Images/image";
import { montserrat } from "../fonts";
import style from "./News.module.css";
import Title from "../Title/Title";

const News = () => {
  const t = useTranslations("News");
  const { lang } = useParams();

  return (
    <SectionContainer>
      <div className={style.wrapper}>
        <Title text={t("title")} />
        <ul className={style.list}>
          {lang === "uk"
            ? newsUk.map((card) => {
                return (
                  <li key={card.cardId} className={style.listItem}>
                    <a href={"/"} className={style.linkCard}>
                      <Image
                        src={cardImages.cardImg1}
                        alt="Card background image"
                        loading="lazy"
                      />
                      <div className={style.contentCard}>
                        <div className={style.contentWrap}>
                          <div className={style.upRightArrowWrap}>
                            <FiArrowUpRight className={style.upRightArrow} />
                          </div>
                          <div
                            className={`${montserrat.className} ${style.titleInfoWrap}`}
                          >
                            <h3 className={style.cardTitle}>
                              {card.cardTitle}
                            </h3>
                            <p className={style.data}>{card.publicationData}</p>
                            <p className={style.fondName}>{card.fondName}</p>
                          </div>
                        </div>
                        <p>{card.info}</p>
                      </div>
                    </a>
                  </li>
                );
              })
            : newsEn.map((card) => {
                return (
                  <li key={card.cardId} className={style.listItem}>
                    <a href={"/"} className={style.linkCard}>
                      <Image
                        src={cardImages.cardImg1}
                        alt="Card background image"
                        loading="lazy"
                      />
                      <div className={style.contentCard}>
                        <div className={style.contentWrap}>
                          <div className={style.upRightArrowWrap}>
                            <FiArrowUpRight className={style.upRightArrow} />
                          </div>
                          <div
                            className={`${montserrat.className} ${style.titleInfoWrap}`}
                          >
                            <h3 className={style.cardTitle}>
                              {card.cardTitle}
                            </h3>
                            <p className={style.data}>{card.publicationData}</p>
                            <p className={style.fondName}>{card.fondName}</p>
                          </div>
                        </div>
                        <p>{card.info}</p>
                      </div>
                    </a>
                  </li>
                );
              })}
        </ul>
        <CustomButton link={"/news"} text={t("button")} />
      </div>
    </SectionContainer>
  );
};

export default News;
