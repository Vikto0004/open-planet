import css from "./Section.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className }: PropsType) {
  return (
    <section className={`${css.section} ${className ? className : ""}`}>
      {children}
    </section>
  );
}
