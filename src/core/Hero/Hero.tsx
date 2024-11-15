"use client";

import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { support } from "@/utils/routes";

import BackgroundImage from "../../../public/BackgroundImage/Banner.webp";
import BackgroundImageMobil from "../../../public/BackgroundImage/BannerMobil.jpg";
import CustomButton from "../CustomButton/CustomButton";
import { montserrat, playfairDisplay } from "../fonts";
import Loader from "../Loader/Loader";
import Section from "../Section/Section";

import style from "./Hero.module.css";

const Hero = () => {
  const t = useTranslations("Hero");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, []);

  return (
    <Section>
      <div className={style.heroImgWrapper}>
        <div className={style.heroTextWrapper}>
          <h1 className={clsx(montserrat.className, style.heroTitle)}>
            {t("title")}
          </h1>
          <h2 className={clsx(playfairDisplay.className, style.heroSlogan)}>
            <span>{t("slogan.partOne")}</span>
            <span>{t("slogan.partTwo")}</span>
            <span>{t("slogan.partThree")}</span>
          </h2>
        </div>
        {isClient ? (
          <Image
            src={isMobile ? BackgroundImageMobil : BackgroundImage}
            sizes="(max-width: 1440px) 100vh"
            alt="Banner picture: Adult hands hold child hands in theirs."
            className={style.backgroundImg}
          />
        ) : (
          <Loader />
        )}
        <CustomButton link={support} className={style.button}>
          {t("toSupport")}
        </CustomButton>
      </div>
    </Section>
  );
};

export default Hero;
