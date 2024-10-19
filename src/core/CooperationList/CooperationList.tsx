"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import cooperation from "@/db-local/cooperation.json";
import { isValidLang } from "@/utils/helper";

import CooperationListItem from "../CooperationListItem/CooperationListItem";
import { montserrat } from "../fonts";

import css from "./CooperationList.module.css";

export default function CooperationList() {
  const lang = useLocale();

  const [activeToId, setActiveToId] = useState<string>(cooperation[0].id);

  const [discr, setDiscr] = useState(() => {
    return cooperation[0][isValidLang(lang)].description;
  });

  useEffect(() => {
    const selected = cooperation.filter(({ id }) => id === activeToId)[0];
    setDiscr(selected[isValidLang(lang)].description);
  }, [lang, activeToId]);

  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {cooperation.map((object) => {
          if (activeToId === object.id) {
            return (
              <CooperationListItem
                key={object.id}
                setActiveToId={setActiveToId}
                title={object[isValidLang(lang)].title}
                discr={discr}
                active={true}
                id={object.id}
              />
            );
          } else {
            return (
              <CooperationListItem
                key={object.id}
                setActiveToId={setActiveToId}
                title={object[isValidLang(lang)].title}
                discr={discr}
                active={false}
                id={object.id}
              />
            );
          }
        })}
      </ul>
      <ul className={css.listDiscr}>
        {discr?.map((text, index) => (
          <li key={index} className={montserrat.className}>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
