"use client";

import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { breadcrumbsValue, URLParams } from "@/utils/breadcrumbs";

import BreadcrumbsItem from "../BreadcrumbsItem/BreadcrumbsItem";
import Container from "../Container/Container";
import { montserrat } from "../fonts";

import style from "./Breadcrumbs.module.css";

const BreadcrumbsNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathnameLength = pathname.split("/").length;

  const [breadcrumb, setBreadcrumb] = useState<
    { title: string; href?: string; id?: string }[]
  >([]);

  const updateLignesBreadcrumbs = useCallback(
    (url: string) => {
      if (!searchParams.has("program")) {
        return setBreadcrumb([breadcrumbsValue[url][0]]);
      }

      const getParam = searchParams.get("program") as string;

      if (URLParams.includes(getParam)) {
        const filter = breadcrumbsValue[url].filter(
          (item) => item.id === getParam,
        );
        const arr = [];
        arr.push(breadcrumbsValue[url][0], ...filter);

        return setBreadcrumb(arr);
      }

      setBreadcrumb([breadcrumbsValue[url][0]]);
    },
    [searchParams],
  );

  useEffect(() => {
    const url = "/" + pathname.split("/")[2];

    if (url === "/lignes-of-work") {
      updateLignesBreadcrumbs(url);
    } else {
      setBreadcrumb(breadcrumbsValue[url]);
    }
  }, [pathname, updateLignesBreadcrumbs]);

  return (
    pathnameLength > 2 && (
      <Container>
        <nav className={clsx(style.nav, style.montserrat)}>
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

export default BreadcrumbsNav;
