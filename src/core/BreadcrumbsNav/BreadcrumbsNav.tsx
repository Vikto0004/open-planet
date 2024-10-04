"use client";

import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useId, useState } from "react";

import { breadcrumbsValue, URLParams } from "@/utils/breadcrumbs";

import BreadcrumbsItem from "../BreadcrumbsItem/BreadcrumbsItem";

import style from "./BreadcrumbsNav.module.css";

const BreadcrumbsNav = () => {
  const spanKey = useId();
  const itemKey = useId();
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
      <nav className={clsx(style.navBase)}>
        <BreadcrumbsItem title="home" href="/" />
        <span>{">>"}</span>
        {breadcrumb &&
          breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span key={spanKey}>{">>"}</span>}
              <BreadcrumbsItem key={itemKey} {...item} />
            </React.Fragment>
          ))}
      </nav>
    )
  );
};

export default BreadcrumbsNav;
