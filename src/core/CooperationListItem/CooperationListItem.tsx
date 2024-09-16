import { FiArrowRight } from "react-icons/fi";

import { montserrat } from "../fonts";
import css from "./CooperationListItem.module.css";

type PropsType = {
  title: string;
  active: boolean;
  selectItem: (id: string) => void;
  id: string;
};

export default function CooperationListItem({
  selectItem,
  title,
  active,
  id,
}: PropsType) {
  return (
    <li
      onClick={() => selectItem(id)}
      className={`${montserrat.className} ${css.item} ${active && css.itemActive}`}
    >
      {title} <FiArrowRight size={24} className={css.icon} />
    </li>
  );
}
