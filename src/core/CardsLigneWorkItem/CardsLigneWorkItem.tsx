import Image from "next/image";

import calendarIcon from "@/../public/svgs/calendar.svg";

import { montserrat, oldStandardTT } from "../fonts";

import css from "./CardsLigneWorkItem.module.css";

type ContentType = {
  id: string;
  typeText: string;
  publicationData: string;
  title: string;
};

type PropsType = {
  image: string;
  content: ContentType;
  redirectionUser: (id: string) => void;
};

export default function CardsLigneWorkItem({
  image,
  content,
  redirectionUser,
}: PropsType) {
  const { typeText, publicationData, title, id } = content;

  return (
    <li className={css.item} onClick={() => redirectionUser(id)}>
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
            width={23}
            height={23}
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
