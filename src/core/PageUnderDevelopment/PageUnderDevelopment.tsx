import { useTranslations } from "next-intl";
import css from "./PageUnderDevelopment.module.css";
import { MdBuild } from "react-icons/md";

export default function PageUnderDevelopment() {
  const translate = useTranslations("PageUnderDevelopment");

  return (
    <div className={css.container}>
      <h2 className={css.title}>
        {translate("title")} <MdBuild />
      </h2>
      <p className={css.prg}>{translate("paragraph")}</p>
    </div>
  );
}
