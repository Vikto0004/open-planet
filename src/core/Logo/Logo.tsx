"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

import { Link } from "@/i18n/routing";

import logoEn from "../../../public/svgs/logo_open-planet-en.svg";
import logoUa from "../../../public/svgs/logo_open-planet.svg";

export default function Logo() {
  const { lang } = useParams();

  return (
    <Link href="/">
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
