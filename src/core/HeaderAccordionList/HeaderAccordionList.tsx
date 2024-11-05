import { useTranslations } from "next-intl";
import { GoDotFill } from "react-icons/go";

import { Link } from "@/i18n/routing";

import { montserrat } from "../fonts";

import css from "./HeaderAccordionList.module.css";

type PropsType = {
  type: "cooperation" | "programs";
  dataLinks: {
    link: string;
    textForTranslate: string;
  }[];
  setIsOpenMenu?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderAccordionList({
  dataLinks,
  type,
  setIsOpenMenu,
}: PropsType) {
  const translate = useTranslations("Header");

  return (
    <ul className={css.list}>
      {dataLinks.map(({ link, textForTranslate }, index) => {
        return (
          <li key={index} className={css.listItem}>
            <GoDotFill size={12} />
            <Link
              href={link}
              onClick={() => setIsOpenMenu && setIsOpenMenu(false)}
              className={`${montserrat.className} ${css.link}`}
            >
              {translate(`${type}.${textForTranslate}`)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
