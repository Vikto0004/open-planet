import css from './Section.module.css';

export default function Section({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className={css.section}>{children}</section>;
}
