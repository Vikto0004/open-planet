import clsx from "clsx";
import Image from "next/image";

import calendarIcon from "../../../public/svgs/calendar.svg";
import { inter } from "../fonts";

import css from "./ProjectDetailsDate.module.css";

type PropsType = {
  data: string;
};

export default function ProjectDetailsDate({ data }: PropsType) {
  return (
    <div className={css.wrap}>
      <Image
        src={calendarIcon}
        width={25}
        height={25}
        alt="calendar icon"
        className={css.image}
      />
      <p className={clsx(inter.className, css.text)}>
        {data.toLocaleLowerCase()}
      </p>
    </div>
  );
}
