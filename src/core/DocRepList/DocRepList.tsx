"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import { useValidLang } from "@/utils/hooks";

import CustomButton from "../CustomButton/CustomButton";
import DocRepCard from "../DocRepCard/DocRepCard";
// import Loader from "../Loader/Loader";

import styles from "./DocRepList.module.css";

//interface from information
interface IInfo {
  cardTitle: string;
  publicationData: string;
  link: string;
}

//interface from input data
interface IItem {
  id: string;
  en: IInfo;
  ua: IInfo;
  isActive: boolean;
}

type Props = {
  data: Array<IItem>;
};

export default function DocRepList({ data }: Props) {
  const lang = useValidLang();
  const translate = useTranslations("paginateLoadMoreButton");
  const infoPar = useTranslations("PageUnderDevelopment");
  const [visibleElements, setVisibleElements] = useState<Array<IItem>>([]); // visible items on the page
  const [page, setPage] = useState(1); // page number
  const [maxElementsPerPage, setMaxElementsPerPage] = useState(12); // number of items on the page
  const [isButtonVisible, setIsButtonVisible] = useState(false); // button visible

  // Function for downloading more items
  const loadNextPage = () => {
    const nextPage = page + 1;
    const nextElements = data.slice(
      nextPage * maxElementsPerPage - maxElementsPerPage,
      nextPage * maxElementsPerPage,
    );

    if (nextElements.length > 0) {
      setVisibleElements((prevVisibleElements) => [
        ...prevVisibleElements,
        ...nextElements,
      ]);
      setPage(nextPage);
    }
  };

  // Update the number of elements on the page depending on the screen width
  useEffect(() => {
    const updateMaxElements = () => {
      if (window.innerWidth < 1440) {
        setMaxElementsPerPage(4); // 4 elements on mobile devices
      } else {
        setMaxElementsPerPage(12); // 12 elements on the desktop
      }
      setPage(1);
    };

    updateMaxElements();

    window.addEventListener("resize", updateMaxElements);
    return () => {
      window.removeEventListener("resize", updateMaxElements);
    };
  }, []);

  // Initializing visible items when changing the number of elements on a page
  useEffect(() => {
    if (page === 1) {
      const initialElements = data.slice(0, maxElementsPerPage);
      setVisibleElements(initialElements);
      setPage(1);
    }
  }, [maxElementsPerPage, data, page]);

  useEffect(() => {
    if (visibleElements.length > 0) {
      setIsButtonVisible(true);
    }
  }, [visibleElements]);

  return (
    <>
      {!data.length && <p className={styles.prg}>{infoPar("paragraph")}</p>}
      <ul className={styles.list}>
        {visibleElements.map((obj) => {
          const { id } = obj;
          const { isActive } = obj;
          const card = obj[lang];
          return (
            <li
              key={id}
              className={`${styles.item} ${!isActive && styles.disabled}`}
            >
              <DocRepCard card={card} isActive={isActive} />
            </li>
          );
        })}
      </ul>
      {isButtonVisible && visibleElements.length < data.length && (
        <CustomButton onClick={loadNextPage} link="" className={styles.btn}>
          {translate("buttonText")}
        </CustomButton>
      )}
    </>
  );
}
