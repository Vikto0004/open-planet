"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionContainer from "../SectionContainer/SectionContainer";
import BackgroundImage from "../../../public/BackgroundImage/Banner.webp";
import { montserrat, playfairDisplay } from "../fonts";
import style from "./Hero.module.css";

const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <SectionContainer>
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
          width={1440}
          height={792}
          alt="Banner picture: Adult hands hold child hands in theirs."
          loading="lazy"
          className={style.backgroundImg}
        />
      </div>
    </SectionContainer>
  );
};

export default Hero;
