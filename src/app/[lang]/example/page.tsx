"use client";

import { useState } from "react";

import Container from "@/core/Container/Container";
import Editor from "@/core/Editor/Editor";
import Section from "@/core/Section/Section";
import { Vacancy } from "@/query/types/vacancy";

import CreateBlock from "./CreateBlock/CreateBlock";

export default function Example() {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const vacancyId = "67a3c391b77e86232154b54b";

  return (
    <Section>
      <Container>
        {vacancy?.ua.description.map((block, index) => {
          return (
            block.children && (
              <Editor
                key={index}
                data={block.children}
                blockId={block._id}
                vacancyId={vacancyId}
                setVacancy={setVacancy}
              />
            )
          );
        })}
        <CreateBlock vacancyId={vacancyId} setVacancy={setVacancy} />
      </Container>
    </Section>
  );
}
