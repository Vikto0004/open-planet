"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Project } from "@/query/types/projects";
import { useSelectedWork } from "@/utils/hooks";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";

import css from "./CardsLigneWorkList.module.css";

type PropsType = {
  projects: Project[];
  programType: string;
};

export default function CardsLigneWorkList({
  projects,
  programType,
}: PropsType) {
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" });
  const [isClient, setIsClient] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setIsClient(true);
    setPathname(window.location.pathname);
  }, []);

  const selectedWork = useSelectedWork(programType);

  if (!isClient) {
    return null;
  }

  const isProgramsPath = pathname.endsWith("/programs");

  const middleIndex = Math.floor(projects.length / 2);

  return isProgramsPath && isMobile ? (
    <Swiper
      spaceBetween={20}
      slidesPerView="auto"
      grabCursor={true}
      navigation={true}
      modules={[Navigation]}
      loop={false}
      loopAdditionalSlides={projects.length}
      initialSlide={middleIndex}
    >
      {projects.map((obj) => (
        <SwiperSlide key={obj._id} className={css.swiperSlide}>
          <CardsLigneWorkItem
            content={{
              obj,
              programType,
              selectedWork,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <ul className={css.list}>
      {projects.map((obj) => (
        <CardsLigneWorkItem
          key={obj._id}
          content={{
            obj,
            programType,
            selectedWork,
          }}
        />
      ))}
    </ul>
  );
}
