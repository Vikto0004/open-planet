import clsx from "clsx";

import publicOffer from "@/db-local/public-offer.json";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import { inter } from "../fonts";
import PublicOfferParagraphList from "../PublicOfferParagraphList/PublicOfferParagraphList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./PublicOffer.module.css";

export default function PublicOffer() {
  const lang = useValidLang();

  return (
    <Section className={css.section}>
      <Container>
        <Title className={css.title}>{publicOffer[lang].title}</Title>
        <p className={clsx(inter.className, css.versionUpdatedAt)}>
          {publicOffer[lang].versionUpdatedAt}
        </p>
        <ul className={css.list}>
          {publicOffer[lang].blocks.map(({ title, paragraph }, index) => {
            return (
              <li className={css.item} key={index}>
                <p className={clsx(inter.className, css.itemTitle)}>{title}</p>
                <PublicOfferParagraphList data={paragraph} />
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
