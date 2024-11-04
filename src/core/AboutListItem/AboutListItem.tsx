import clsx from "clsx";
import Image from "next/image";

import { montserrat } from "../fonts";

import css from "./AboutListItem.module.css";

type PropsType = {
  title: string;
  description: string;
  image: string;
};

export default function AboutListItem({
  title,
  description,
  image,
}: PropsType) {
  return (
    <li className={css.listItem}>
      <Image
        src={image}
        width={118}
        height={118}
        alt={title}
        className={css.img}
      />
      <div>
        <p className={clsx(montserrat.className, css.listTitle)}>{title}</p>
        <p className={clsx(montserrat.className, css.listDiscr)}>
          {description}
        </p>
      </div>
    </li>
  );
}
