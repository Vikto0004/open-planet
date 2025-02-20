import { useTranslations } from "next-intl";
import { BiShoppingBag } from "react-icons/bi";
import { FiArrowUpRight } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoEllipse } from "react-icons/io5";

import { Link } from "@/i18n/routing";
import { Vacancy } from "@/query/types/vacancy";
import { formatDate } from "@/utils/helper";
import { useValidLang } from "@/utils/hooks";
import { joinUs } from "@/utils/routes";

import css from "./VacancyListItem.module.css";

type PropsType = {
  data: Vacancy;
};

export default function VacancyListItem({ data }: PropsType) {
  const translate = useTranslations("JoinUs");
  const lang = useValidLang();

  return (
    <li className={css.item}>
      <div className={css.wrap}>
        <p className={css.joinUs}>
          <IoEllipse /> {translate("title")}
        </p>
        <p className={css.text}>{formatDate(data.createdAt, lang)}</p>
      </div>
      <h3 className={css.title}>{data[lang].title}</h3>
      <div className={css.container}>
        <div className={css.wrapper}>
          <p className={css.text}>
            <BiShoppingBag />
            {data[lang].employment}
          </p>
          <p className={css.text}>
            <GrLocation />
            {data[lang].region}
          </p>
        </div>
        <Link href={joinUs + "/" + data._id} className={css.button}>
          <span className={css.buttonText}>{translate("btnDetails")}</span>
          <FiArrowUpRight size="24px" />
        </Link>
      </div>
    </li>
  );
}
