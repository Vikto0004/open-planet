import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import style from "./BreadcrumbsItem.module.css";

type breadcrumbsItemProps = Omit<LinkProps, "href"> & {
  href?: LinkProps["href"];
  title: string;
};

const BreadcrumbsItem = ({ title, href, ...props }: breadcrumbsItemProps) => {
  const translate = useTranslations("Breadcrumbs");
  const { lang } = useParams();

  return href ? (
    <Link href={`/${lang}${href}`} className={style.item} {...props}>
      {translate(title)}
    </Link>
  ) : (
    <span className={style.item}>{translate(title)}</span>
  );
};

export default BreadcrumbsItem;
