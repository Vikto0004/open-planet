import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { IoChevronDown } from "react-icons/io5";

import { montserrat } from "../fonts";
import NavLink from "../NavLink/NavLink";

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
              className={clsx(montserrat.className, css.popoverButton)}
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
                      <NavLink
                        href={link}
                        onClick={() => close()}
                        className={clsx(
                          montserrat.className,
                          css.popoverPanelLink,
                        )}
                      >
                        {translate(`${type}.${textForTranslate}`)}
                      </NavLink>
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
