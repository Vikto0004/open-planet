import css from "./Container.module.css";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
