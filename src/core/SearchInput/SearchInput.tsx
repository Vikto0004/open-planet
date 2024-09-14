import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSpring, animated } from "@react-spring/web";

import css from "./SearchInput.module.css";
import { montserrat } from "../fonts";
import { useTranslations } from "next-intl";

const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const translate = useTranslations("Header");

  const props = useSpring({
    width: isOpen ? "600px" : "0px",
    opacity: isOpen ? 1 : 0,
    padding: isOpen ? "17px" : "0px",
    config: { duration: 300 },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setValue(query);
  };

  return (
    <>
      {isOpen && (
        <div onClick={() => setIsOpen(!isOpen)} className={css.overlay}></div>
      )}
      <div className={css.wrap}>
        <animated.input
          type="text"
          placeholder={translate("search")}
          value={value}
          className={`${montserrat.className} ${css.inputSearch}`}
          style={{ ...props }}
          onChange={handleChange}
        />
        <FiSearch
          onClick={() => setIsOpen(!isOpen)}
          size="24px"
          className={css.searchIcon}
        />
      </div>
    </>
  );
};

export default SearchInput;
