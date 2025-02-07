"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";

import { useValidLang } from "@/utils/hooks";

import CustomButton from "../CustomButton/CustomButton";
import TendersCard from "../TendersCard/TendersCard";

import styles from "./TendersList.module.css";

//interface from information
interface IInfo {
  cardTitle: string;
  publicationData: string;
  relevant: string;
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

export default function TendersList({ data }: Props) {
  const lang = useValidLang();
  const translateDescription = useTranslations("DetailsOfTenders");
  const infoPar = useTranslations("PageUnderDevelopment");
  const translateBtn = useTranslations("Buttons");
  const [visibleElements, setVisibleElements] = useState<Array<IItem>>([]); // visible items on the page
  const [page, setPage] = useState(1); // page number
  const [maxElementsPerPage, setMaxElementsPerPage] = useState(6); // number of items on the page
  const [isButtonVisible, setIsButtonVisible] = useState(false); // button visible
  const [isMobile, setIsMobile] = useState(false); // button visible

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
      if (window.innerWidth < 1240) {
        setMaxElementsPerPage(3); // 3 elements on mobile devices
        setIsMobile(true);
      } else {
        setMaxElementsPerPage(6); // 6 elements on the desktop
        setIsMobile(false);
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
      <h3 className={styles.headThird}>
        {translateDescription("description")}
      </h3>
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
              <TendersCard card={card} isActive={isActive} id={id} />
            </li>
          );
        })}
      </ul>
      {isMobile && isButtonVisible && visibleElements.length < data.length && (
        <CustomButton onClick={loadNextPage} link="" className={styles.btn}>
          {translateBtn("offers")}
        </CustomButton>
      )}
    </>
  );
}
