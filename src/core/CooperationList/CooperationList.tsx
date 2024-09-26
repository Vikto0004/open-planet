"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import cooperation from "@/db-local/cooperation.json";

import CooperationListItem from "../CooperationListItem/CooperationListItem";
import { montserrat } from "../fonts";

import css from "./CooperationList.module.css";

export default function CooperationList() {
  const { lang } = useParams();
  const [activeToId, setActiveToId] = useState<string>(cooperation[0].id);

  const [discr, setDiscr] = useState(() => {
    if (lang === "en" || lang === "ua") {
      return cooperation[0][lang].description;
    }
  });

  useEffect(() => {
    if (lang === "en" || lang === "ua") {
      const selected = cooperation.filter(({ id }) => id === activeToId)[0];
      setDiscr(selected[lang].description);
    }
  }, [lang, activeToId]);

  return (
    <div className={css.wrap}>
      <ul className={css.list}>
        {cooperation.map((object) => {
          if (lang === "en" || lang === "ua") {
            if (activeToId === object.id) {
              return (
                <CooperationListItem
                  key={object.id}
                  setActiveToId={setActiveToId}
                  title={object[lang].title}
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
                  active={false}
                  id={object.id}
                />
              );
            }
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
