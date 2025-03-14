"use client";

import clsx from "clsx";

import { PublicOfferData } from "@/query/types/public-offer";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import { inter } from "../fonts";
import Renderer from "../Renderer/Renderer";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./PublicOffer.module.css";

type PropsType = {
  data: PublicOfferData;
};

export default function PublicOffer({ data }: PropsType) {
  const lang = useValidLang();

  return (
    data[lang] && (
      <Section className={css.section}>
        <Container>
          <Title className={css.title}>{data[lang].title}</Title>
          <p className={clsx(inter.className, css.versionUpdatedAt)}>
            {data[lang].subtitle}
          </p>
          {data[lang].blocks.map((block, index) => (
            <Renderer key={index} node={block} />
          ))}
        </Container>
      </Section>
    )
  );
}
