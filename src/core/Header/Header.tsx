"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import CustomButton from "../CustomButton/CustomButton";
import PopoverList from "../PopoverList/PopoverList";
import SearchInput from "../SearchInput/SearchInput";
import NavLink from "../NavLink/NavLink";
import SelectLang from "../SelectLang/SelectLang";
import Logo from "../Logo/Logo";
import SocIcons from "../SocIcons/SocIcons";

import { montserrat } from "../fonts";
import css from "./Header.module.css";

export default function Header() {
  const { lang } = useParams();
  const translate = useTranslations("Header");

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Logo />
        <nav className={css.navigate}>
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
        </nav>
        <div className={css.wrapper}>
          <div className={css.wrap}>
            <SearchInput />
            <SelectLang />
          </div>
          <SocIcons />
          <div className={css.wrapButton}>
            <CustomButton
              link="/payment-by-card"
              text={translate("toSupport")}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
