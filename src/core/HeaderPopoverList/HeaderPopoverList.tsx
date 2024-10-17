import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { IoChevronDown } from "react-icons/io5";

import { Link } from "@/i18n/routing";

import { montserrat } from "../fonts";

import css from "./HeaderPopoverList.module.css";

type PropsType = {
  type: "cooperation" | "programs";
  dataLinks: {
    link: string;
    textForTranslate: string;
  }[];
};

export default function HeaderPopoverList({ type, dataLinks }: PropsType) {
  const translate = useTranslations("Header");

  return (
    <>
      <Popover className={css.popover}>
        {({ open, close }) => (
          <>
            {open && <div onClick={() => close} className={css.overlay}></div>}
            <PopoverButton
              className={`${montserrat.className} ${css.popoverButton}`}
            >
              {translate(`${type}.title`)}
              <IoChevronDown
                className={open ? css.popoverIconActive : ""}
                size="24px"
              />
            </PopoverButton>
            <PopoverPanel anchor="bottom end" className={css.popoverPanel}>
              <ul className={css.popoverPanelList}>
                {dataLinks.map(({ link, textForTranslate }, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link}
                        onClick={() => close()}
                        className={`${montserrat.className} ${css.popoverPanelLink}`}
                      >
                        {translate(`${type}.${textForTranslate}`)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </PopoverPanel>
          </>
        )}
      </Popover>
    </>
  );
}
