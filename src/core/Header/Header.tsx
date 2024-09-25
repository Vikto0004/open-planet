"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { lang } = useParams();
  const translate = useTranslations("Header");

  const handleSearch = (): void => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setValue(query);
  };

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
            {isOpen && (
              <input
                type="text"
                className={`${montserrat.className} ${css.input}`}
                placeholder={translate("search")}
                value={value}
                onChange={handleChange}
              />
            )}
          </nav>
          <div className={css.wrap}>
            <SearchInput handleSearch={handleSearch} />
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
