import clsx from "clsx";

import publicOffer from "@/db-local/public-offer.json";
import publicReceiving from "@/db-local/public-receiving.json";
import { useValidLang } from "@/utils/hooks";

import Container from "../Container/Container";
import { inter } from "../fonts";
import PublicOfferParagraphList from "../PublicOfferParagraphList/PublicOfferParagraphList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./PublicOffer.module.css";

type PropsType = {
  receiving: boolean;
};

export default function PublicOffer({ receiving }: PropsType) {
  const lang = useValidLang();

  return (
    <Section className={css.section}>
      <Container>
        <Title className={css.title}>
          {receiving ? publicReceiving[lang].title : publicOffer[lang].title}
        </Title>
        <p className={clsx(inter.className, css.versionUpdatedAt)}>
          {receiving
            ? publicReceiving[lang].versionUpdatedAt
            : publicOffer[lang].versionUpdatedAt}
        </p>
        <ul className={css.list}>
          {receiving
            ? publicReceiving[lang].blocks.map(
                ({ title, paragraph }, index) => {
                  return (
                    <li className={css.item} key={index}>
                      <p className={clsx(inter.className, css.itemTitle)}>
                        {title}
                      </p>
                      <PublicOfferParagraphList data={paragraph} />
                    </li>
                  );
                },
              )
            : publicOffer[lang].blocks.map(({ title, paragraph }, index) => {
                return (
                  <li className={css.item} key={index}>
                    <p className={clsx(inter.className, css.itemTitle)}>
                      {title}
                    </p>
                    <PublicOfferParagraphList data={paragraph} />
                  </li>
                );
              })}
        </ul>
      </Container>
    </Section>
  );
}
