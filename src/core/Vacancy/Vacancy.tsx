import { BiShoppingBag } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { IoEllipse } from "react-icons/io5";

import vacancy from "@/db-local/vacancy.json";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import Renderer from "../Renderer/Renderer";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./Vacancy.module.css";

export default function Vacancy() {
  const lang = useValidLang();

  return (
    <Section className={css.section}>
      <Container>
        <Title className={css.title}>{vacancy[0][lang].title}</Title>
        <div className={css.wrap}>
          <p className={css.paragraph}>
            <IoEllipse className={css.ioEllipse} /> Вакансія
          </p>
          <p className={css.paragraph}>Опубліковано 01 січня 2025 року</p>
        </div>
        <div className={css.block}>
          <div className={css.wrapper}>
            <p className={css.text}>
              <BiShoppingBag size="20px" />
              {vacancy[0][lang].employment}
            </p>
            <p className={css.text}>
              <GrLocation size="20px" />
              {vacancy[0][lang].region}
            </p>
          </div>
          <div>
            {vacancy[0][lang].description.map((node, index) => {
              return <Renderer key={index} node={node} />;
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
