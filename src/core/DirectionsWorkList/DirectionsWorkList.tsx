"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import directionsWorkEn from "@/db-local/directions_work-en.json";
import directionsWorkUa from "@/db-local/directions_work-ua.json";
import { useRouter } from "@/i18n/routing";
import links from "@/utils/routes";

import { montserrat } from "../fonts";

import css from "./DirectionsWorkList.module.css";

import "./DirectionsWorkSwiper.css";
import "swiper/css";
import "swiper/css/pagination";

export default function DirectionsWorkList() {
  const { lang } = useParams();

  const [rightAct, setRightAct] = useState(false);
  const [leftAct, setLeftAct] = useState(false);
  const [count, setCount] = useState(0);

  const router = useRouter();
  const { DirectionsWork } = links;

  const redirectionUser = (programParam: string) => {
    router.push(`${DirectionsWork.allPrograms}/${programParam}`);
  };

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = (e.currentTarget as HTMLButtonElement).id;
    setRightAct(false);
    setLeftAct(false);

    setCount(() => {
      let newCount = count;
      if (button === "right") {
        newCount = count + 1;
        if (newCount === 1) setRightAct(true);
      } else if (button === "left") {
        newCount = count - 1;
        if (newCount === -1) setLeftAct(true);
      }
      return newCount;
    });
  };

  return (
    <>
      <div className={css.wrap}>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          initialSlide={2}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {lang === "ua"
            ? directionsWorkUa.map(({ id, title, url, image }) => {
                return (
                  <SwiperSlide
                    className={css.slideItem}
                    key={id}
                    onClick={() => redirectionUser(url)}
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
            : directionsWorkEn.map(({ id, title, url, image }) => {
                return (
                  <SwiperSlide
                    className={css.slideItem}
                    key={id}
                    onClick={() => redirectionUser(url)}
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
        <button
          onClick={handleButton}
          id="left"
          disabled={leftAct}
          className={`${css.swiperButton} swiper-button-prev `}
        >
          <LuArrowLeft size={36} />
        </button>
        <button
          onClick={handleButton}
          id="right"
          disabled={rightAct}
          className={`${css.swiperButton} swiper-button-next `}
        >
          <LuArrowRight size={36} />
        </button>
      </div>
    </>
  );
}
