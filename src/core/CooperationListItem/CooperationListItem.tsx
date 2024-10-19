import { FiArrowRight } from "react-icons/fi";

import { montserrat } from "../fonts";

import css from "./CooperationListItem.module.css";

type PropsType = {
  title: string;
  discr: string[];
  active: boolean;
  setActiveToId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
};

export default function CooperationListItem({
  setActiveToId,
  title,
  discr,
  active,
  id,
}: PropsType) {
  return (
    <li onClick={() => setActiveToId(id)}>
      <div className={`${css.wrap} ${active ? css.wrapActive : ""}`}>
        <h3 className={`${montserrat.className} ${css.title}`}>{title}</h3>
        <FiArrowRight size={24} className={css.icon} />
      </div>
      {active && (
        <ul className={css.listDiscr}>
          {discr?.map((text, index) => (
            <li key={index} className={montserrat.className}>
              {text}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
