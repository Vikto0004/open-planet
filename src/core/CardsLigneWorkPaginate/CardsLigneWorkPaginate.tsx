import clsx from "clsx";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import ReactPaginate from "react-paginate";

import { oldStandardTT } from "../fonts";

import css from "./CardsLigneWorkPaginate.module.css";

type PropsType = {
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CardsLigneWorkPaginate({
  totalPages,
  setCurrentPage,
}: PropsType) {
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

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
      onPageChange={handlePageChange}
      containerClassName={clsx(oldStandardTT.className, css.pagination)}
      activeClassName={css.active}
      disabledClassName={css.disabled}
    />
  );
}
