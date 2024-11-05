"use client";

import { useEffect, useState } from "react";

import cooperation from "@/db-local/cooperation.json";
import { useValidLang } from "@/utils/hooks";

import CooperationListItem from "../CooperationListItem/CooperationListItem";
import { montserrat } from "../fonts";

import css from "./CooperationList.module.css";

export default function CooperationList() {
  const lang = useValidLang();

  const [activeToId, setActiveToId] = useState<string>(cooperation[0].id);
  const [discr, setDiscr] = useState(cooperation[0][lang].description);

  useEffect(() => {
    const selected = cooperation.filter(({ id }) => id === activeToId)[0];
    setDiscr(selected[lang].description);
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
                title={object[lang].title}
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
                title={object[lang].title}
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
