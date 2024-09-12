"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaFacebook } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";

import logo from "../../../public/svgs/logo_open-planet.svg";
import CustomButton from "../CustomButton/CustomButton";
import NavLink from "../NavLink/NavLink";
import PopoverList from "../PopoverList/PopoverList";
import SearchInput from "../SearchInput/SearchInput";
import SelectLang from "../SelectLang/SelectLang";

import css from "./Header.module.css";

export default function Header() {
  const { lang } = useParams();
  const t = useTranslations("Header");

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Image
          src={logo.src}
          alt="Logo"
          width={logo.width}
          height={logo.height}
        />
        <nav className={css.navigate}>
          <NavLink href={`/${lang}`} styles={css.link}>
            {t("home")}
          </NavLink>
          <PopoverList />
          <NavLink href={`/${lang}/lignes-of-work`} styles={css.link}>
            {t("directionsWork")}
          </NavLink>
          <NavLink href={`/${lang}/reports`} styles={css.link}>
            {t("reports")}
          </NavLink>
        </nav>
        <div className={css.wrapper}>
          <div className={css.wrap}>
            <SearchInput />
            <SelectLang />
          </div>
          <div className={css.wrap}>
            <a
              className={css.socIcon}
              href="https://www.instagram.com/_v_i_t_o_k__/"
            >
              <FaFacebook size="32px" />
            </a>
            <a className={css.socIcon} href="/">
              <SiInstagram size="32px" />
            </a>
          </div>
          <div className={css.wrapButton}>
            <CustomButton link="/payment-by-card" text={t("toSupport")} />
          </div>
        </div>
      </div>
    </header>
  );
}
