"use client";

import { useState } from "react";

import { Project } from "@/query/types/projects";
import { useSelectedWork } from "@/utils/hooks";

import CardsLigneWorkItem from "../CardsLigneWorkItem/CardsLigneWorkItem";
import CardsLigneWorkPaginate from "../CardsLigneWorkPaginate/CardsLigneWorkPaginate";

import css from "./CardsLigneWorkList.module.css";

type PropsType = {
  projects: Project[];
  programType: string;
};

const ITEMS_PER_PAGE = 3; // Number of items to load at once

export default function CardsLigneWorkList({
  projects,
  programType,
}: PropsType) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE); // Tracks visible items
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
  const selectedWork = useSelectedWork(programType);

  // Get the projects to display based on the current visible count
  const visibleProjects = projects.slice(0, visibleCount);

  // Load more items
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE); // Add more items for mobile
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {visibleProjects.map((obj) => (
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
    </div>
  );
}
