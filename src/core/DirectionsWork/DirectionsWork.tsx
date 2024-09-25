import { useTranslations } from "next-intl";

import CustomButton from "../CustomButton/CustomButton";
import DirectionsWorkList from "../DirectionsWorkList/DirectionsWorkList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./DirectionsWork.module.css";

export default function DirectionsWork() {
  const translate = useTranslations("DirectionsWork");
  return (
    <Section>
      <div className={css.container}>
        <Title text={translate("title")} />
        <DirectionsWorkList />
        <CustomButton
          text={translate("button")}
          link="/lignes-of-work"
          style={css.buttun}
        />
      </div>
    </Section>
  );
}
