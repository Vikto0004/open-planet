import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type breadcrumbsItemProps = Omit<LinkProps, "href"> & {
  href?: LinkProps["href"];
  title: string;
};

const BreadcrumbsItem = ({ title, href, ...props }: breadcrumbsItemProps) => {
  const translate = useTranslations("Breadcrumbs");
  const { lang } = useParams();

  return href ? (
    <Link href={`/${lang}${href}`} {...props}>
      {translate(title)}
    </Link>
  ) : (
    <span>{translate(title)}</span>
  );
};

export default BreadcrumbsItem;
