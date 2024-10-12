"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

import links from "@/utils/routes";

import CustomButton from "../CustomButton/CustomButton";
import { montserrat } from "../fonts";
import HeaderNavList from "../HeaderNavList/HeaderNavList";
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
  const { Header } = links;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <div className={css.wrapper}>
          <nav className={css.nav}>
            {!isOpen && (
              <>
                <div className={css.navWrap}>
                  <NavLink
                    href={`/${lang}${Header.home}`}
                    styles={`${montserrat.className} ${css.link}`}
                  >
                    {translate("home")}
                  </NavLink>
                  <PopoverList />
                </div>
                <HeaderNavList />
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
            link={Header.support}
            text={translate("toSupport")}
            style={css.customButton}
          />
        </div>
        <button className={css.burgerBtn}>
          <RxHamburgerMenu size={23} />
        </button>
      </div>
    </header>
  );
}
