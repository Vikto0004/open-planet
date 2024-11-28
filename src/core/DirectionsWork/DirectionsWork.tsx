import { useTranslations } from "next-intl";

import links from "@/utils/routes";

import CustomButton from "../CustomButton/CustomButton";
import DirectionsWorkList from "../DirectionsWorkList/DirectionsWorkList";
import Section from "../Section/Section";
import Title from "../Title/Title";

import css from "./DirectionsWork.module.css";

export default function DirectionsWork() {
  const translate = useTranslations("DirectionsWork");
  const { DirectionsWork } = links;

  return (
    <Section>
      <div className={css.container}>
        <Title>{translate("title")}</Title>
        <DirectionsWorkList />
        <CustomButton link={DirectionsWork.allPrograms} className={css.buttun}>
          {translate("button")}
        </CustomButton>
      </div>
    </Section>
  );
}
