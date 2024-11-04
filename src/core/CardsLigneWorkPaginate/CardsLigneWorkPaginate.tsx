import clsx from "clsx";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import ReactPaginate from "react-paginate";

import { oldStandardTT } from "../fonts";

import css from "./CardsLigneWorkPaginate.module.css";

type PropsType = {
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
};

export default function CardsLigneWorkPaginate({
  totalPages,
  onPageChange,
}: PropsType) {
  return (
    <ReactPaginate
      previousLabel={
        <button className={css.button}>
          <LuArrowLeft size={30} />
        </button>
      }
      nextLabel={
        <button className={css.button}>
          <LuArrowRight size={30} />
        </button>
      }
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={clsx(oldStandardTT.className, css.pagination)}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
