import { ReactNode } from "react";
import style from './SectionContainer.module.css';

const SectionContainer = ({ children }: { children: ReactNode }) => {
  return <section className={style.section}>{children}</section>;
};

export default SectionContainer;
