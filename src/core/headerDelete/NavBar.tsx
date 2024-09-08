"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { HeaderLinks } from "@/constants/Links";

import CustomLink from "../CustomLink";

export const NavBar = ({
  lang,
  isMobile = false,
}: {
  lang: string;
  isMobile?: boolean;
}) => {
  const pathName = usePathname();
  const [navigation, setNavigation] = useState<{ [key: string]: string }>({});

  const isAdmin = true;

  useEffect(() => {
    const fetchNavigation = async () => {
      const { navigation } = await getDictionary(lang);

      const { admin, ...rest } = navigation;

      setNavigation(isAdmin ? { admin, ...rest } : rest);
    };

    fetchNavigation();
  }, [isAdmin, lang]);

  return (
    <ul className={`flex  gap-2 ${isMobile ? "flex-col" : "flex-row"}`}>
      {HeaderLinks.map((i) => {
        const pathSegment = pathName.split("/");
        let isCurrent;
        if (pathSegment[1] && pathSegment[1].length === 2) {
          const path = pathSegment.slice(2);
          isCurrent = "/" + path.join("/");
        } else {
          isCurrent = pathName;
        }

        const current = pathName === i.path || isCurrent === i.path;

        return (
          <li key={i.label} className={``}>
            <CustomLink href={i.path} lang={lang}>
              {navigation[i.label]}
            </CustomLink>
          </li>
        );
      })}
    </ul>
  );
};
