"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import CustomButton from "../CustomButton/CustomButton";
import { montserrat } from "../fonts";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import PopoverList from "../PopoverList/PopoverList";
import SearchInput from "../SearchInput/SearchInput";
import SelectLang from "../SelectLang/SelectLang";
import SocIcons from "../SocIcons/SocIcons";

import css from "./Header.module.css";

export default function Header() {
  const translate = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);

  const { lang } = useParams();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <div className={css.wrapper}>
          <nav className={css.navigate}>
            {!isOpen && (
              <>
                <NavLink
                  href={`/${lang}`}
                  styles={`${montserrat.className} ${css.link}`}
                >
                  {translate("home")}
                </NavLink>
                <PopoverList />
                <NavLink
                  href={`/${lang}/lignes-of-work`}
                  styles={`${montserrat.className} ${css.link}`}
                >
                  {translate("directionsWork")}
                </NavLink>
                <NavLink
                  href={`/${lang}/news`}
                  styles={`${montserrat.className} ${css.link}`}
                >
                  {translate("news")}
                </NavLink>
                <NavLink
                  href={`/${lang}/reports`}
                  styles={`${montserrat.className} ${css.link}`}
                >
                  {translate("reports")}
                </NavLink>
              </>
            )}
            {isOpen && <SearchInput setIsOpen={setIsOpen} isOpen={isOpen} />}
          </nav>
          <div className={css.wrap}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={css.searchBtn}
            >
              <FiSearch size="24px" className={css.searchIcon} />
            </button>
            <SelectLang />
          </div>
          <SocIcons />
          <CustomButton
            link="/payment-by-card"
            text={translate("toSupport")}
            style={css.customButton}
          />
        </div>
      </div>
    </header>
  );
}
