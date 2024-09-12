import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <p className={css.logo}>Open Planet</p>
      <div className={css.element}>
        <p className={css.user}>
          Іван Іванов <span>(Модератор)</span>
        </p>
        <button className={css.button}>Вийти з системи</button>
      </div>
    </header>
  );
};

export default Header;
