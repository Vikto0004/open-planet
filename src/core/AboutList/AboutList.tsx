"use client";

import { useParams } from "next/navigation";

import ourValuesEn from "@/db-local/our_values-en.json";
import ourValuesUa from "@/db-local/our_values-ua.json";

import AboutListItem from "../AboutListItem/AboutListItem";

import css from "./AboutList.module.css";

export default function AboutList() {
  const { lang } = useParams();

  return (
    <ul className={css.list}>
      {lang === "en"
        ? ourValuesEn.map(({ id, title, description, image }) => {
            return (
              <AboutListItem
                key={id}
                title={title}
                description={description}
                image={image}
              />
            );
          })
        : ourValuesUa.map(({ id, title, description, image }) => {
            return (
              <AboutListItem
                key={id}
                title={title}
                description={description}
                image={image}
              />
            );
          })}
    </ul>
  );
}
