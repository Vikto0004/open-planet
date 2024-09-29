import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { IoChevronDown } from "react-icons/io5";

import { Link } from "@/i18n/routing";
import links from "@/utils/routes";

import { montserrat } from "../fonts";

import css from "./PopoverList.module.css";

export default function PopoverList() {
  const translate = useTranslations("Header");
  const { Header } = links;

  return (
    <Popover className={css.popover}>
      {({ open, close }) => (
        <>
          {open && <div onClick={() => close} className={css.overlay}></div>}
          <PopoverButton
            className={`${montserrat.className} ${css.popoverButton}`}
          >
            {translate("cooperationFund.title")}
            <IoChevronDown
              className={open ? css.popoverIconActive : ""}
              size="24px"
            />
          </PopoverButton>
          <PopoverPanel anchor="bottom end" className={css.popoverPanel}>
            <ul className={css.popoverPanelList}>
              {Header.cooperation.map(({ link, textForTranslate }, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={link}
                      onClick={() => close()}
                      className={`${montserrat.className} ${css.popoverPanelLink}`}
                    >
                      {translate(textForTranslate)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
