import Container from "../Container/Container";
import Section from "../Section/Section";
import VacancyList from "../VacancyList/VacancyList";

import css from "./JoinUs.module.css";

export default function JoinUs() {
  return (
    <Section className={css.section}>
      <Container>
        <VacancyList />
      </Container>
    </Section>
  );
}
