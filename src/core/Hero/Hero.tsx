"use client";

import Image from "next/image";
import SectionContainer from "../SectionContainer/SectionContainer";
import BackgroundImage from "../../../public/BackgroundImage/Banner.webp";
import { montserrat, playfairDisplay } from "../fonts";

import style from "./Hero.module.css";

const Hero = () => {
  return (
    <SectionContainer>
      <div className={style.heroImgWrapper}>
        <div className={style.heroTextWrapper}>
          <h1 className={`${montserrat.className} ${style.heroTitle}`}>
            Благодійний фонд &quot;Відкрита планета ЮА&quot;
          </h1>
          <ul className={`${playfairDisplay.className} ${style.heroTextList}`}>
            <li>
              <h2>&#8220;МИ ПРОСТО</h2>
            </li>
            <li>
              <h2>ДОПОМАГАЄМО</h2>
            </li>
            <li>
              <h2>ЛЮДЯМ&#8221;</h2>
            </li>
          </ul>
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
