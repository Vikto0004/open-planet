import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "react-responsive";

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

  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
  const translate = useTranslations("paginateLoadMoreButton");
  const [isClient, setisClient] = useState(false);

  useEffect(() => {
    setisClient(true);
  }, []);

  return (
    <ReactPaginate
      previousLabel={
        isMobile ? (
          <button className={css.buttonMobileHidden}>
            {translate("buttonText")}
          </button>
        ) : (
          <button className={css.button}>
            <LuArrowLeft size={30} />
          </button>
        )
      }
      nextLabel={
        isMobile ? (
          <div className={css.buttonMobileContainer}>
            <button className={css.buttonMobile}>
              {translate("buttonText")}
              <FiArrowUpRight size="25px" className={css.icon} />
            </button>
          </div>
        ) : (
          <button className={css.button}>
            <LuArrowRight size={30} />
          </button>
        )
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
