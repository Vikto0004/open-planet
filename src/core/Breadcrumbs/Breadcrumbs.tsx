"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { breadcrumbsValue } from "@/utils/breadcrumbs";

import BreadcrumbsItem from "../BreadcrumbsItem/BreadcrumbsItem";
import Container from "../Container/Container";
import { montserrat } from "../fonts";

import style from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathnameLength = pathname.split("/").length;

  const [breadcrumb, setBreadcrumb] = useState<
    { title: string; href?: string; id?: string }[]
  >([]);

  const updateLignesBreadcrumbs = useCallback(
    (url: string) => {
      setBreadcrumb([breadcrumbsValue[url][0]]);

      const programType = pathname.split("/programs/")[1]?.split("/")[0];

      if (programType) {
        const result = breadcrumbsValue[url].filter(
          ({ id }) => id === programType,
        );
        setBreadcrumb((prevBreadcrumb) => {
          return [...prevBreadcrumb, ...result];
        });
        return;
      }
    },
    [pathname],
  );

  useEffect(() => {
    const url = "/" + pathname.split("/")[2];

    if (url === "/programs") {
      updateLignesBreadcrumbs(url);
    } else {
      setBreadcrumb(breadcrumbsValue[url]);
    }
  }, [pathname, updateLignesBreadcrumbs]);

  return (
    pathnameLength > 2 && (
      <Container className={style.container}>
        <nav
          className={clsx(style.nav, style.breadcrumbs, montserrat.className)}
        >
          <ul className={style.list}>
            <li className={style.listItem}>
              <BreadcrumbsItem title="home" href="/" />
              <span className={style.separator}>{">>"}</span>
            </li>
            {breadcrumb &&
              breadcrumb.map((item, index) => (
                <li key={index} className={style.listItem}>
                  <BreadcrumbsItem {...item} />
                  {index < breadcrumb.length - 1 && (
                    <span className={style.separator}>{">>"}</span>
                  )}
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    )
  );
};

export default Breadcrumbs;
