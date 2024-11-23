import { useTranslations } from "next-intl";

import { Link } from "@/i18n/routing";

type PropsType = {
  href?: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const BreadcrumbsItem = ({ title, href, onClick, ...props }: PropsType) => {
  const translate = useTranslations("Breadcrumbs");

  return href ? (
    <Link href={href} {...props}>
      {translate(title)}
    </Link>
  ) : (
    <span onClick={onClick} style={{ cursor: "default" }}>
      {translate(title)}
    </span>
  );
};

export default BreadcrumbsItem;
