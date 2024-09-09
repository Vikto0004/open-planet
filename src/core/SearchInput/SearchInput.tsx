import { useSpring, animated } from "@react-spring/web";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import css from "./SearchInput.module.css";

const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const props = useSpring({
    width: isOpen ? "400px" : "0px",
    opacity: isOpen ? 1 : 0,
    padding: isOpen ? "10px" : "0px",
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
          placeholder="Search..."
          value={value}
          className={css.inputSearch}
          style={{ ...props }}
          onChange={handleChange}
        />
        <FiSearch
          onClick={() => setIsOpen(!isOpen)}
          size="24px"
          style={{ cursor: "pointer" }}
        />
      </div>
    </>
  );
};

export default SearchInput;
