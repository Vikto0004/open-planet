"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import newsUa from "../../db-local/news-ua.json";
import newsEn from "../../db-local/news-en.json";

import "swiper/css";
import "swiper/css/pagination";
import NewsCard from "../NewsCard/NewsCard";
import { useLocale } from "next-intl";

import css from "./NewsSwiperList.module.css";

export default function NewsSwiperList() {
  const lang = useLocale();

  return (
    <div className={css.wrap}>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={20}
        className={css.swiper}
      >
        {lang === "ua"
          ? newsUa.map((card) => {
              return (
                <SwiperSlide key={card.cardId} className={css.slideItem}>
                  <NewsCard card={card} />
                </SwiperSlide>
              );
            })
          : newsEn.map((card) => {
              return (
                <SwiperSlide key={card.cardId} className={css.slideItem}>
                  <NewsCard card={card} />
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}
