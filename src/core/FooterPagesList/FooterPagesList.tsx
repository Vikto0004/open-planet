import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import { montserrat } from "../fonts";
import NavLink from "../NavLink/NavLink";

import css from "./FooterPagesList.module.css";

type PropsType = {
  type: string;
};

export default function FooterPagesList({ type }: PropsType) {
  const translate = useTranslations("Footer");

  const { Footer } = links;

  if (type === "information" || type === "pages") {
    return (
      <>
        <p className={`${montserrat.className} ${css.title}`}>
          {translate(`${type}.title`)}
        </p>
        <ul className={css.list}>
          {Footer[type].map(({ link, textForTranslate }, index) => {
            return (
              <li key={index}>
                <NavLink
                  href={link}
                  className={`${montserrat.className} ${css.link}`}
                >
                  {translate(textForTranslate)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
