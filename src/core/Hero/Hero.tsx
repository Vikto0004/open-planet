"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import BackgroundImage from "../../../public/BackgroundImage/Banner.webp";
import { montserrat, playfairDisplay } from "../fonts";
import Section from "../Section/Section";

import style from "./Hero.module.css";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <Section>
      <div className={style.heroImgWrapper}>
        <div className={style.heroTextWrapper}>
          <h1 className={`${montserrat.className} ${style.heroTitle}`}>
            {t("title")}
          </h1>
          <h2 className={`${playfairDisplay.className} ${style.heroSlogan}`}>
            <span>{t("slogan.partOne")}</span>
            <span>{t("slogan.partTwo")}</span>
            <span>{t("slogan.partThree")}</span>
          </h2>
        </div>
        <Image
          src={BackgroundImage}
          sizes="(max-width: 1440px) 100vh"
          alt="Banner picture: Adult hands hold child hands in theirs."
          className={style.backgroundImg}
        />
      </div>
    </Section>
  );
};

export default Hero;
