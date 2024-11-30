import clsx from "clsx";
import Image from "next/image";

import calendarIcon from "@/../public/svgs/calendar.svg";
import { useRouter } from "@/i18n/routing";
import { Project } from "@/query/types/projects";
import { formatDate } from "@/utils/helper";
import { useValidLang } from "@/utils/hooks";
import links from "@/utils/routes";

import { montserrat, oldStandardTT } from "../fonts";

import css from "./CardsLigneWorkItem.module.css";

type PropsType = {
  content: { obj: Project; selectedWork: string; programType: string };
};

export default function CardsLigneWorkItem({ content }: PropsType) {
  const lang = useValidLang();

  const router = useRouter();
  const { DirectionsWork } = links;

  const { selectedWork, obj, programType } = content;

  const redirectionUser = (id: string, type: string) => {
    router.push(`${DirectionsWork.allPrograms}/${type}/${id}`);
  };

  return (
    <li
      className={css.item}
      onClick={() => redirectionUser(obj._id, programType)}
    >
      <div className={css.wrap}>
        <p className={clsx(oldStandardTT.className, css.text)}>
          {selectedWork}
        </p>
      </div>
      <Image
        className={css.img}
        src={obj[lang].mainImg}
        alt={obj[lang].cardTitle}
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
          <p className={clsx(montserrat.className, css.textDate)}>
            {formatDate(obj.createdAt, lang)}
          </p>
        </div>
        <p className={clsx(oldStandardTT.className, css.title)}>
          {obj[lang].cardTitle}
        </p>
      </div>
    </li>
  );
}
