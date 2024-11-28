"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useMediaQuery } from "react-responsive";
import "react-photo-view/dist/react-photo-view.css";

import css from "./ProjectDetailsImagesList.module.css";

type PropsType = {
  data: string[];
};

export default function ProjectDetailsImagesList({ data }: PropsType) {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <PhotoProvider maskOpacity={0.5}>
      <ul className={css.list}>
        {data.map((url, index) => (
          <li key={index} className={css.item}>
            {isMobile ? (
              <PhotoView src={url}>
                <Image
                  width={400}
                  height={400}
                  src={url}
                  className={css.image}
                  alt="about project image"
                />
              </PhotoView>
            ) : (
              <Image
                width={400}
                height={400}
                src={url}
                className={css.image}
                alt="about project image"
              />
            )}
          </li>
        ))}
      </ul>
    </PhotoProvider>
  );
}
