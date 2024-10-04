import { useLogout } from "@/admin-shared/hooks";

import css from "./Header.module.css";

const Header = () => {
  const { mutate } = useLogout();

  const onLogout = () => {
    mutate();
  };
  return (
    <header className={css.header}>
      <p className={css.logo}>Open Planet</p>
      <div className={css.element}>
        <p className={css.user}>
          Іван Іванов <span>(Модератор)</span>
        </p>
        <button className={css.button} onClick={onLogout}>
          Вийти з системи
        </button>
      </div>
    </header>
  );
};

export default Header;
