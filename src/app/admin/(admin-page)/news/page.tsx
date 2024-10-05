import css from "./page.module.css";

const News = () => {
  return (
    <ul className={css.list}>
      <li className={css.grid}>
        <h2 className={css.title}>№</h2>
        <h2 className={css.title}>Заголовок</h2>
        <h2 className={css.title}>Автор</h2>
        <h2 className={css.title}>Дата публікації</h2>
      </li>
      <li className={css.grid}>
        <h2 className={css.text}>1</h2>
        <h2 className={css.text}>Тут заголовок новини</h2>
        <h2 className={css.text}>Іван Іванов</h2>
        <h2 className={css.text}>11.09.2024 - 13:30</h2>
      </li>
      <li className={css.grid}>
        <h2 className={css.text}>2</h2>
        <h2 className={css.text}>Тут заголовок новини</h2>
        <h2 className={css.text}>Іван Іванов</h2>
        <h2 className={css.text}>11.09.2024 - 13:30</h2>
      </li>
      <li className={css.grid}>
        <h2 className={css.text}>3</h2>
        <h2 className={css.text}>Тут заголовок новини</h2>
        <h2 className={css.text}>Іван Іванов</h2>
        <h2 className={css.text}>11.09.2024 - 13:30</h2>
      </li>
    </ul>
  );
};

export default News;
