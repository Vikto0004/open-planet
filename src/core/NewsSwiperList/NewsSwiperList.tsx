"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useValidLang } from "@/utils/hooks";

import news from "../../db-local/news.json";
import NewsCard from "../NewsCard/NewsCard";

import css from "./NewsSwiperList.module.css";

export default function NewsSwiperList() {
  const lang = useValidLang();

  return (
    <div className={css.wrap}>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        initialSlide={1}
        spaceBetween={20}
        className={css.swiper}
      >
        {news.map((obj) => {
          const { id, image } = obj;
          return (
            <SwiperSlide key={obj.id} className={css.slideItem}>
              <NewsCard card={{ id, image, ...obj[lang] }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
