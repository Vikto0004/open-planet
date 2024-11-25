import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

type PropsType = {
  href?: string;
  title: string;
  translate: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const BreadcrumbsItem = ({
  title,
  href,
  onClick,
  translate,
  ...props
}: PropsType) => {
  const t = useTranslations("Breadcrumbs");

  return href ? (
    <Link href={href} {...props}>
      {translate ? t(title) : title}
    </Link>
  ) : (
    <span onClick={onClick} style={{ cursor: "default" }}>
      {translate ? t(title) : title}
    </span>
  );
};

export default BreadcrumbsItem;
