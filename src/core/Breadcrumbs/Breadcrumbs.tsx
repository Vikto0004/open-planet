"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { breadcrumbsValue } from "@/utils/breadcrumbs";
import { useValidLang } from "@/utils/hooks";

import BreadcrumbsItem from "../BreadcrumbsItem/BreadcrumbsItem";
import Container from "../Container/Container";
import { montserrat } from "../fonts";
import Section from "../Section/Section";

import style from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const lang = useValidLang();
  const pathname = usePathname();
  const [pathSegments, setPathSegments] = useState(pathname.split("/"));

  const [breadcrumb, setBreadcrumb] = useState<
    { title: string; href?: string; id?: string; translate: boolean }[]
  >([]);

  const isMobile = useMediaQuery({ query: "(max-width: 1240px)" });
  const [isProjectPage, setIsProjectPage] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const router = useRouter();

  const updateLignesBreadcrumbs = useCallback(
    (url: string) => {
      const programType = pathSegments[3];
      const projectId = pathSegments[4];

      setBreadcrumb([breadcrumbsValue[url][0]]);

      if (projectId && isMobile) {
        setIsProjectPage(true);
        setBreadcrumb([{ title: "goBack", translate: true }]);
        return;
      } else setIsProjectPage(false);

      if (programType) {
        const result = breadcrumbsValue[url].filter(
          ({ id }) => id === programType,
        );
        setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, ...result]);
      }

      if (projectId) {
        const titles = localStorage.getItem("projectTitle");
        if (titles) {
          const title = JSON.parse(titles)[lang];
          setIsProjectPage(true);
          setBreadcrumb((prev) => [...prev, { title, translate: false }]);
        }
      }
    },
    [isMobile, pathSegments, lang],
  );

  useEffect(() => {
    const url = "/" + pathSegments[2];

    if (url === "/programs") {
      updateLignesBreadcrumbs(url);
    } else {
      setBreadcrumb(breadcrumbsValue[url]);
    }
  }, [pathname, updateLignesBreadcrumbs, pathSegments]);

  useEffect(() => {
    setIsReady(true);
    setPathSegments(pathname.split("/"));
  }, [pathname]);

  return (
    isReady &&
    pathname.split("/").length > 2 && (
      <Section
        className={clsx(
          style.isActive,
          isMobile && !isProjectPage && style.section,
        )}
      >
        <Container>
          <nav
            className={clsx(style.nav, style.breadcrumbs, montserrat.className)}
          >
            <ul className={style.list}>
              {!isMobile ? (
                <>
                  <li className={style.listItem}>
                    <BreadcrumbsItem title="home" translate={true} href="/" />
                    <span className={style.separator}>{">>"}</span>
                  </li>
                  {breadcrumb?.map((item, index) => (
                    <li key={index} className={style.listItem}>
                      <BreadcrumbsItem {...item} />
                      {index < breadcrumb.length - 1 && (
                        <span className={style.separator}>{">>"}</span>
                      )}
                    </li>
                  ))}
                </>
              ) : (
                isProjectPage &&
                breadcrumb?.map(({ title, translate }, index) => (
                  <li key={index} className={style.listItem}>
                    <span className={style.separator}>{"<<"}</span>
                    <BreadcrumbsItem
                      translate={translate}
                      title={title}
                      onClick={router.back}
                    />
                  </li>
                ))
              )}
            </ul>
          </nav>
        </Container>
      </Section>
    )
  );
};

export default Breadcrumbs;
