"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiMail, FiMapPin } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { PiCopyright } from "react-icons/pi";

import links from "@/utils/routes";

import AccordionWrapper from "../AccordionWrapper/AccordionWrapper";
import CustomButton from "../CustomButton/CustomButton";
import { montserrat, oldStandardTT } from "../fonts";
import FooterPagesList from "../FooterPagesList/FooterPagesList";
import Logo from "../Logo/Logo";
import SocIcons from "../SocIcons/SocIcons";

import css from "./Footer.module.css";
import { IoIosArrowDown } from "react-icons/io";

export default function Footer() {
  const translate = useTranslations("Footer");
  const [expanded, setExpanded] = useState<string | false>(false);

  const { Footer } = links;

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <Logo />
        <div className={`${oldStandardTT.className} ${css.wrap}`}>
          <p className={`${oldStandardTT.className} ${css.discr}`}>
            {translate("discrIcons")}
          </p>
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
        <div className={css.wrapList}>
          <FooterPagesList type="pages" />
        </div>
        <div className={css.wrapAcc}>
          <AccordionWrapper
            setExpanded={setExpanded}
            expanded={expanded}
            expandIcon={<IoIosArrowDown className={css.icon} />}
            expandedStyle={css.isActive}
          >
            <p className={`${montserrat.className} ${css.titleAcc}`}>
              {translate("pages.mobil.title")}
            </p>
            <FooterPagesList type="pages" />
          </AccordionWrapper>
        </div>
        <div className={css.infoWrap}>
          <div className={css.wrapList}>
            <FooterPagesList type="information" />
          </div>
          <div className={css.wrapAcc}>
            <AccordionWrapper
              setExpanded={setExpanded}
              expanded={expanded}
              expandIcon={<IoIosArrowDown className={css.icon} />}
              expandedStyle={css.isActive}
            >
              <p className={`${montserrat.className} ${css.titleAcc}`}>
                {translate("information.title")}
              </p>
              <FooterPagesList type="information" />
            </AccordionWrapper>
          </div>
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
