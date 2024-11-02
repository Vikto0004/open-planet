import Image from "next/image";

import { montserrat } from "../fonts";

import css from "./Mono.module.css";

export default function Mono() {
  return (
    <div className={css.wrap}>
      <p className={`${montserrat.className} ${css.text}`}>
        Відскануйте qr-code Монобанк
      </p>
      <Image
        width={400}
        height={325}
        src={"https://i.ibb.co/wgcBGDv/QR-code.png"}
        alt="QR-code"
      />
      <p className={`${montserrat.className} ${css.text}`}>
        або перейдіть за
        <a
          className={css.link}
          href="https://monobank.ua/"
          target="_blank"
          rel="noopener noreferrer"
        >
          посиланням
        </a>
      </p>
    </div>
  );
}
