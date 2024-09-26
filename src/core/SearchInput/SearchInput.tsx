import { useTranslations } from "next-intl";
import { useState } from "react";

import { montserrat } from "../fonts";

import css from "./SearchInput.module.css";

type PropsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchInput = ({ setIsOpen, isOpen }: PropsType) => {
  const translate = useTranslations("Header");
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setValue(query);
  };

  return (
    <>
      <div className={css.overlay} onClick={() => setIsOpen(!isOpen)}></div>
      <input
        type="text"
        className={`${montserrat.className} ${css.input}`}
        placeholder={translate("search")}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default SearchInput;
