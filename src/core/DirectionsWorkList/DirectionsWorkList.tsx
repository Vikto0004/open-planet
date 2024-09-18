"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "@/i18n/routing";
import directionsWorkUa from "@/db-local/directions_work-uk.json";
import directionsWorkEn from "@/db-local/directions_work-en.json";

import css from "./DirectionsWorkList.module.css";
import "./DirectionsWorkSwiper.css";
import "swiper/css";
import "swiper/css/pagination";
import { montserrat } from "../fonts";

export default function DirectionsWorkList() {
  const { lang } = useParams();

  const router = useRouter();

  const redirectionUser = (id: string) => {
    router.push(`/lignes-of-work/${id}`);
  };

  return (
    <>
      <div className={css.wrap}>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          initialSlide={2}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {lang === "uk"
            ? directionsWorkUa.map(({ id, title, image }) => {
                return (
                  <SwiperSlide
                    className={css.slideItem}
                    key={id}
                    onClick={() => redirectionUser(id)}
                  >
                    <Image
                      className={css.slideImg}
                      src={image}
                      alt={title}
                      width={400}
                      height={460}
                    />
                    <div className={css.slideWrap}>
                      <h3
                        className={`${montserrat.className} ${css.slideTitle}`}
                      >
                        {title}
                      </h3>
                    </div>
                  </SwiperSlide>
                );
              })
            : directionsWorkEn.map(({ id, title, image }) => {
                return (
                  <SwiperSlide
                    className={css.slideItem}
                    key={id}
                    onClick={() => redirectionUser(id)}
                  >
                    <Image
                      className={css.slideImg}
                      src={image}
                      alt={title}
                      width={400}
                      height={460}
                    />
                    <div className={css.slideWrap}>
                      <h3
                        className={`${montserrat.className} ${css.slideTitle}`}
                      >
                        {title}
                      </h3>
                    </div>
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>
      <div className={css.swiperButtonWrap}>
        <button className={`${css.swiperButton} swiper-button-prev`}>
          <LuArrowLeft size={36} />
        </button>
        <button className={`${css.swiperButton} swiper-button-next`}>
          <LuArrowRight size={36} />
        </button>
      </div>
    </>
  );
}
