"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FiMail, FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { PiCopyright } from "react-icons/pi";

import CustomButton from "../CustomButton/CustomButton";
import { montserrat, oldStandardTT } from "../fonts";
import Logo from "../Logo/Logo";
import NavLink from "../NavLink/NavLink";
import SocIcons from "../SocIcons/SocIcons";

import css from "./Footer.module.css";

export default function Footer() {
  const { lang } = useParams();
  const translate = useTranslations("Footer");

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />
        <div className={`${oldStandardTT.className} ${css.wrap}`}>
          <p>{translate("discrIcons")}</p>
          <SocIcons footer={true} />
        </div>
      </div>
      <div className={css.secContainer}>
        <ul className={css.contactList}>
          <li>
            <p className={`${montserrat.className} ${css.contactListTitle}`}>
              {translate("nav.address.title")}
            </p>
            <div className={css.contactListWrap}>
              <FiMapPin className={css.contactListIcon} />
              <p className={`${montserrat.className} ${css.contactListText}`}>
                {translate("nav.address.text")}
              </p>
            </div>
          </li>
          <li>
            <p className={`${montserrat.className} ${css.contactListTitle}`}>
              {translate("nav.phone")}
            </p>
            <div className={css.contactListWrap}>
              <LuPhone className={css.contactListIcon} />
              <p className={`${montserrat.className} ${css.contactListText}`}>
                +38 098 152 25 43
              </p>
            </div>
          </li>
          <li>
            <p className={`${montserrat.className} ${css.contactListTitle}`}>
              E-mail:
            </p>
            <div className={css.contactListWrap}>
              <FiMail className={css.contactListIcon} />
              <p className={`${montserrat.className} ${css.contactListText}`}>
                openplanetua@gmail.com
              </p>
            </div>
          </li>
        </ul>
        <ul className={css.navList}>
          <li>
            <p className={`${montserrat.className} ${css.navListText}`}>
              {translate("pages.title")}
            </p>
          </li>
          <li>
            <NavLink
              href={`/${lang}`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${lang}/lignes-of-work`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.programs")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${lang}/join-us`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.joinUs")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${lang}/details-of-tenders`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.requests")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${lang}/news`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.news")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${lang}/payment-by-card`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.support")}
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/${lang}/reports`}
              styles={`${montserrat.className} ${css.navLink}`}
            >
              {translate("pages.reports")}
            </NavLink>
          </li>
        </ul>
        <div className={css.infoWrap}>
          <ul className={css.infoList}>
            <li>
              <p className={`${montserrat.className} ${css.navListText}`}>
                {translate("information.title")}
              </p>
            </li>
            <li>
              <NavLink
                href={`/${lang}/public-offer`}
                styles={`${montserrat.className} ${css.navLink}`}
              >
                {translate("information.publicOffer")}
              </NavLink>
            </li>
            <li>
              <NavLink
                href={`/${lang}/public-offer-charity`}
                styles={`${montserrat.className} ${css.navLink}`}
              >
                {translate("information.publicReceiving")}
              </NavLink>
            </li>
            <li>
              <NavLink
                href={`/${lang}/privacy-policy`}
                styles={`${montserrat.className} ${css.navLink}`}
              >
                {translate("information.privacyPolicy")}
              </NavLink>
            </li>
          </ul>
          <CustomButton link="/payment-by-card" text={translate("button")} />
        </div>
      </div>
      <div className={css.copyrightWrap}>
        <PiCopyright />
        <p className={montserrat.className}>2024. All right reserved</p>
      </div>
    </footer>
  );
}
