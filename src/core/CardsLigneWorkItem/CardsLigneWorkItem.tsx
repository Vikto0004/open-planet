import Image from "next/image";

import calendarIcon from "@/../public/svgs/calendar.svg";

import { montserrat, oldStandardTT } from "../fonts";

import css from "./CardsLigneWorkItem.module.css";

type ContentType = {
  typeText: string;
  publicationData: string;
  title: string;
};

type PropsType = {
  image: string;
  content: ContentType;
};

export default function CardsLigneWorkItem({ image, content }: PropsType) {
  const { typeText, publicationData, title } = content;

  return (
    <li className={css.item}>
      <div className={css.wrap}>
        <p className={`${oldStandardTT.className} ${css.text}`}>{typeText}</p>
      </div>
      <Image
        className={css.img}
        src={image}
        alt={title}
        width={400}
        height={460}
      />
      <div className={css.container}>
        <div className={css.containerWrap}>
          <Image
            src={calendarIcon}
            width={16}
            height={16}
            alt="calendar icon"
          />
          <p className={`${montserrat.className} ${css.textDate}`}>
            {publicationData}
          </p>
        </div>
        <p className={`${oldStandardTT.className} ${css.title}`}>{title}</p>
      </div>
    </li>
  );
}