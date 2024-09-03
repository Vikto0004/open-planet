import Link from "next/link";
import { ReactNode } from "react";

import { i18n } from "../../i18n-config";

type TCustomLink = {
  href: string;
  lang: string;
  children: ReactNode;
  [key: string]: unknown;
};

const CustomLink = ({ href, lang, ...props }: TCustomLink) => {
  const isDefaultLang = lang === i18n.defaultLocale;
  const path = isDefaultLang ? href : `/${lang}${href}`;

  return <Link href={path} {...props} />;
};

export default CustomLink;
