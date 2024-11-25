import { Project } from "@/query/types/projects";
import CardsLigneWorkList from "../CardsLigneWorkList/CardsLigneWorkList";
import Container from "../Container/Container";
import Section from "../Section/Section";

type PropsType = {
  projects: Project[];
};

export default function LatestProjects({ projects }: PropsType) {
  return (
    <Section>
      <Container>
        <CardsLigneWorkList projects={projects} programType={"education"} />
      </Container>
    </Section>
  );
}
