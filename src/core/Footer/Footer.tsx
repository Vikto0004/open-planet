"use client";

import { useTranslations } from "next-intl";
import CustomButton from "../CustomButton/CustomButton";
import Logo from "../Logo/Logo";
import SocIcons from "../SocIcons/SocIcons";
import { PiCopyright } from "react-icons/pi";

import css from "./Footer.module.css";
import { FiMail, FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import NavLink from "../NavLink/NavLink";
import { useParams } from "next/navigation";

export default function Footer() {
  const { lang } = useParams();
  const translate = useTranslations("Header");

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />
        <div className={css.wrap}>
          <p>Підпишіться, щоб підтримати нас та бути в курсі останніх </p>
          <SocIcons />
        </div>
      </div>
      <div className={css.secContainer}>
        <ul className={css.contactList}>
          <li>
            <p className={css.contactListTitle}>Адреса</p>
            <div className={css.contactListWrap}>
              <FiMapPin className={css.contactListIcon} />
              <p className={css.contactListText}>
                01010 м. Київ, вул. Князів Острозських, 5/2А
              </p>
            </div>
          </li>
          <li>
            <p className={css.contactListTitle}>Телефон гарячої лінії</p>
            <div className={css.contactListWrap}>
              <LuPhone className={css.contactListIcon} />
              <p className={`${css.contactListText}`}>+38 098 152 25 43</p>
            </div>
          </li>
          <li>
            <p className={css.contactListTitle}>E-mail:</p>
            <div className={css.contactListWrap}>
              <FiMail className={css.contactListIcon} />
              <p className={`${css.contactListText}`}>openplanetua@gmail.com</p>
            </div>
          </li>
        </ul>
        <ul className={css.navList}>
          <li>
            <p className={css.navListText}>Сторінки</p>
          </li>
          <li>
            <NavLink href={`/${lang}`} styles={css.navLink}>
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${lang}/lignes-of-work`} styles={css.navLink}>
              Напрямки роботи
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${lang}/join-us`} styles={css.navLink}>
              Долучитися до команди
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${lang}/details-of-tenders`} styles={css.navLink}>
              Запити та пропозиції
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${lang}/news`} styles={css.navLink}>
              Новини
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${lang}/payment-by-card`} styles={css.navLink}>
              Підтримати фонд
            </NavLink>
          </li>
          <li>
            <NavLink href={`/${lang}/reports`} styles={css.navLink}>
              Звіти
            </NavLink>
          </li>
        </ul>
        <div className={css.infoWrap}>
          <ul className={css.infoList}>
            <li>
              <p className={css.navListText}>Інформація</p>
            </li>
            <li>
              <NavLink href={`/${lang}/reports`} styles={css.navLink}>
                Публічна оферта
              </NavLink>
            </li>
            <li>
              <NavLink href={`/${lang}/reports`} styles={css.navLink}>
                Публічна оферта отримання благодійної допомоги
              </NavLink>
            </li>
            <li>
              <NavLink href={`/${lang}/reports`} styles={css.navLink}>
                Політика конфіденційності
              </NavLink>
            </li>
          </ul>
          <CustomButton link="/payment-by-card" text={translate("toSupport")} />
        </div>
      </div>
      <div className={css.copyrightWrap}>
        <PiCopyright />
        <p>2024. All right reserved</p>
      </div>
    </footer>
  );
}
