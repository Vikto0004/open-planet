import css from "./Container.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: PropsType) {
  return (
    <div className={`${css.container} ${className ? className : ""}`}>
      {children}
    </div>
  );
}
