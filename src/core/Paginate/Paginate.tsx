"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { FiArrowUpRight } from "react-icons/fi";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "react-responsive";

import css from "./Paginate.module.css";

type PropsType = {
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  loadMore: () => void;
};

export default function Paginate({
  totalPages,
  setCurrentPage,
  currentPage,
  loadMore,
}: PropsType) {
  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
  const translate = useTranslations("paginateLoadMoreButton");

  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      loadMore();
    }
  };

  return isMobile ? (
    <div className={css.buttonMobileContainer}>
      {currentPage < totalPages && (
        <button className={clsx(css.buttonMobile)} onClick={handleLoadMore}>
          {translate("buttonText")}
          <div className={css.upRightArrowWrap}>
            <FiArrowUpRight className={css.upRightArrow} />
          </div>
        </button>
      )}
    </div>
  ) : (
    <ReactPaginate
      previousLabel={
        <button className={css.button}>
          <LuArrowLeft size={30} />
        </button>
      }
      nextLabel={
        <button className={css.button} onClick={handleLoadMore}>
          <LuArrowRight size={30} />
        </button>
      }
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageChange}
      containerClassName={clsx(css.pagination)}
      activeClassName={css.active}
      disabledClassName={css.disabled}
      forcePage={currentPage - 1}
    />
  );
}
