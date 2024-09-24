import { FiArrowRight } from "react-icons/fi";

import { montserrat } from "../fonts";

import css from "./CooperationListItem.module.css";

type PropsType = {
  title: string;
  active: boolean;
  setActiveToId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
};

export default function CooperationListItem({
  setActiveToId,
  title,
  active,
  id,
}: PropsType) {
  return (
    <li
      onClick={() => setActiveToId(id)}
      className={`${montserrat.className} ${css.item} ${active && css.itemActive}`}
    >
      {title} <FiArrowRight size={24} className={css.icon} />
    </li>
  );
}
