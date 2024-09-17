import { useTranslations } from "next-intl";

import CustomButton from "../CustomButton/CustomButton";
import DirectionsWorkList from "../DirectionsWorkList/DirectionsWorkList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./DirectionsWork.module.css";

export default function DirectionsWork() {
  const translate = useTranslations("directionsWork");
  return (
    <Section>
      <Title text={translate("title")} />
      <DirectionsWorkList />
      <div className={css.wrap}>
        <CustomButton text={translate("button")} link="/lignes-of-work" />
      </div>
    </Section>
  );
}
