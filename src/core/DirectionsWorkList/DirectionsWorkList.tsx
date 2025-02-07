"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import directionsWork from "@/db-local/directions-work.json";
import { useRouter } from "@/i18n/routing";
import { useValidLang } from "@/utils/hooks";
import links from "@/utils/routes";

import { montserrat } from "../fonts";

import css from "./DirectionsWorkList.module.css";

import "./DirectionsWorkSwiper.css";
import "swiper/css";
import "swiper/css/pagination";

export default function DirectionsWorkList() {
  const lang = useValidLang();

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
          initialSlide={2}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              allowTouchMove: true,
            },
            1440: {
              allowTouchMove: false,
            },
          }}
        >
          {directionsWork.map((obj) => {
            const { title, type, image } = obj[lang];

            return (
              <SwiperSlide
                className={css.slideItem}
                key={obj.id}
                onClick={() => redirectionUser(type)}
              >
                <Image
                  className={css.slideImg}
                  src={image}
                  alt={title}
                  width={400}
                  height={460}
                  priority={true}
                />
                <div className={css.slideWrap}>
                  <h3 className={clsx(montserrat.className, css.slideTitle)}>
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
          className={clsx(css.swiperButton, "swiper-button-prev")}
        >
          <LuArrowLeft size={36} />
        </button>
        <button
          onClick={handleButton}
          id="right"
          disabled={rightAct}
          className={clsx(css.swiperButton, "swiper-button-next")}
        >
          <LuArrowRight size={36} />
        </button>
      </div>
    </>
  );
}
