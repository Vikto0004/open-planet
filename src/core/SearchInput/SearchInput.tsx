import { FiSearch } from "react-icons/fi";

import css from "./SearchInput.module.css";

const SearchInput = ({ handleSearch }: { handleSearch: () => void }) => {
  return (
    <>
      <FiSearch onClick={handleSearch} size="24px" className={css.searchIcon} />
    </>
  );
};

export default SearchInput;
