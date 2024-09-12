"use client";

// import CustomButton from "../../../core/CustomButton/CustomButton";
// import PopoverList from "../../../core/PopoverList/PopoverList";
// import SearchInput from "../../../core/SearchInput/SearchInput";
// import SelectLang from "../../../core/SelectLang/SelectLang";
// import NavLink from "../../../core/NavLink/NavLink";
// // import Logo from '../Logo/Logo';
import css from "./Header.module.css";
// import { montserrat } from "../../../core/fonts";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <h1>sdaadasdsa</h1>
        {/* <Logo lang={lang} /> */}
        {/* <nav className={css.navigate}>
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
        </nav> */}
        {/* <div className={css.wrapper}>
          <div className={css.wrap}>
            <SearchInput />
            <SelectLang />
          </div>
          <div className={css.wrap}>
            <a
              className={css.socIcon}
              href="https://www.facebook.com/openplanet.ua"
            >
              <FaFacebook size="32px" />
            </a>
            <a
              className={css.socIcon}
              href="https://www.instagram.com/_v_i_t_o_k__/"
            >
              <SiInstagram size="32px" />
            </a>
          </div>
          <div className={css.wrapButton}>
            <CustomButton
              link="/payment-by-card"
              text={translate("toSupport")}
            />
          </div>
        </div> */}
      </div>
    </header>
  );
}
