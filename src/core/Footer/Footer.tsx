import { useTranslations } from "next-intl";
import { FiMail, FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { PiCopyright } from "react-icons/pi";

import links from "@/utils/routes";

import CustomButton from "../CustomButton/CustomButton";
import { montserrat, oldStandardTT } from "../fonts";
import FooterInfoList from "../FooterInfoList/FooterInfoList";
import FooterNavList from "../FooterNavList/FooterNavList";
import Logo from "../Logo/Logo";
import SocIcons from "../SocIcons/SocIcons";

import css from "./Footer.module.css";

export default function Footer() {
  const translate = useTranslations("Footer");
  const { Footer } = links;

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
        <div>
          <p className={`${montserrat.className} ${css.navListText}`}>
            {translate("pages.title")}
          </p>
          <FooterNavList />
        </div>
        <div className={css.infoWrap}>
          <p className={`${montserrat.className} ${css.navListText}`}>
            {translate("information.title")}
          </p>
          <FooterInfoList />
          <CustomButton
            link={Footer.support}
            text={translate("button")}
            style={css.button}
          />
        </div>
      </div>
      <div className={css.copyrightWrap}>
        <PiCopyright />
        <p className={montserrat.className}>2024. All right reserved</p>
      </div>
    </footer>
  );
}
