import { useTranslations } from "next-intl";
import CustomButton from "../CustomButton/CustomButton";
import DirectionsWorkList from "../DirectionsWorkList/DirectionsWorkList";
import Section from "../Section/Section";
import Title from "../Title/Title";
import css from "./DirectionsWork.module.css";

export default function DirectionsWork() {
  const translate = useTranslations("HomePage");
  return (
    <Section>
      <Title text={translate("directionsWork.title")} />
      <DirectionsWorkList />
      <div className={css.wrap}>
        <CustomButton
          text={translate("directionsWork.button")}
          link="/lignes-of-work"
        />
      </div>
    </Section>
  );
}
