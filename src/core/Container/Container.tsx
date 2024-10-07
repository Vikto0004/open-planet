import css from "./Container.module.css";

type PropsType = {
  children: React.ReactNode;
  style?: string;
};

export default function Container({ children, style }: PropsType) {
  return (
    <div className={`${css.container} ${style ? style : ""}`}>{children}</div>
  );
}
