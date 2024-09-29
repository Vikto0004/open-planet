"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { Link } from "@/i18n/routing";
import links from "@/utils/routes";

import logoEn from "../../../public/svgs/logo_open-planet-en.svg";
import logoUa from "../../../public/svgs/logo_open-planet.svg";

export default function Logo() {
  const { lang } = useParams();
  const { Header } = links;

  return (
    <Link href={`/${Header.home}`}>
      {lang === "en" ? (
        <Image
          src={logoEn.src}
          alt="Logo"
          width={logoEn.width}
          height={logoEn.height}
        />
      ) : (
        <Image
          src={logoUa.src}
          alt="Logo"
          width={logoUa.width}
          height={logoUa.height}
        />
      )}
    </Link>
  );
}
