"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { AuthLinks } from "@/constants/Links";

import CustomLink from "../CustomLink";

const Auth = ({ lang }: { lang: string }) => {
  const pathName = usePathname();
  const [labels, setLabels] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    (async () => {
      const { authNav } = await getDictionary(lang);
      setLabels(authNav);
    })();
  }, [lang]);

  return (
    <nav>
      <div>
        <ul className="">
          {AuthLinks.auth.map((i) => {
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
                  {labels[i.label]}
                </CustomLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Auth;
