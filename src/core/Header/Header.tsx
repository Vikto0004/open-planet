"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

import links from "@/utils/routes";

import CustomButton from "../CustomButton/CustomButton";
import HeaderDropdownMenu from "../HeaderDropdownMenu /HeaderDropdownMenu";
import HeaderNav from "../HeaderNav/HeaderNav";
import Logo from "../Logo/Logo";
import SearchInput from "../SearchInput/SearchInput";
import SelectLang from "../SelectLang/SelectLang";
import SocIcons from "../SocIcons/SocIcons";

import css from "./Header.module.css";

export default function Header() {
  const translate = useTranslations("Header");

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { Header } = links;

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <div className={css.wrapper}>
          <nav className={css.nav}>
            {!isOpenSearch && <HeaderNav setIsOpenMenu={setIsOpenMenu} />}
            {isOpenSearch && (
              <SearchInput setIsOpen={setIsOpenSearch} isOpen={isOpenSearch} />
            )}
          </nav>
          <div className={css.wrap}>
            <button
              onClick={() => setIsOpenSearch(!isOpenSearch)}
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
        <button className={css.burgerBtn} onClick={() => setIsOpenMenu(true)}>
          <RxHamburgerMenu size={23} />
        </button>
      </div>
      <HeaderDropdownMenu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />
    </header>
  );
}
