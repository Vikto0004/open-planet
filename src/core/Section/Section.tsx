import css from "./Section.module.css";

type PropsType = {
  children: React.ReactNode;
  style?: string;
};

export default function Section({ children, style = "" }: PropsType) {
  return <section className={`${css.section} ${style}`}>{children}</section>;
}
