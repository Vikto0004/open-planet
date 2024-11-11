import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

import { support } from "@/utils/routes";

import CustomButton from "../CustomButton/CustomButton";
import { montserrat } from "../fonts";
import HeaderNav from "../HeaderNav/HeaderNav";
import Logo from "../Logo/Logo";
import SelectLang from "../SelectLang/SelectLang";
import SocIcons from "../SocIcons/SocIcons";

import css from "./HeaderDropdownMenu.module.css";

type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderDropdownMenu({ isOpen, setIsOpen }: PropsType) {
  const translate = useTranslations("Header");
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setValue(query);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={clsx(css.container, isOpen && css.isOpen)}>
      <div className={css.logoWrap}>
        <Logo />
        <button className={css.closeBtn} onClick={() => setIsOpen(false)}>
          <IoCloseOutline size="32px" />
        </button>
      </div>
      <div className={css.wrapper}>
        <div className={css.searchWrap}>
          <button className={css.searchBtn}>
            <FiSearch size="24px" className={css.searchIcon} />
          </button>
          <input
            type="text"
            className={clsx(montserrat.className, css.input)}
            placeholder={translate("search")}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className={css.wrap}>
          <div className={css.wrapLink}>
            <HeaderNav setIsOpenMenu={setIsOpen} />
          </div>
          <SocIcons />
          <SelectLang />
        </div>
        <CustomButton
          link={support}
          className={css.customButton}
          onClick={() => setIsOpen(false)}
        >
          {translate("toSupport")}
        </CustomButton>
      </div>
    </div>
  );
}
