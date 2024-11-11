import Container from "@/core/Container/Container";
import Section from "@/core/Section/Section";

import SelectLang from "./components/SelectLang/SelectLang";

export default function Example() {
  return (
    <Section>
      <Container>
        <SelectLang />
      </Container>
    </Section>
  );
}
