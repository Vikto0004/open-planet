import { FaFacebook } from "react-icons/fa";
// import { SiInstagram } from "react-icons/si";

import links from "@/utils/routes";

import css from "./SocIcons.module.css";

type PropsType = {
  footer?: boolean;
};

export default function SocIcons({ footer = false }: PropsType) {
  const { Header } = links;

  return (
    <div className={css.wrap}>
      {footer ? (
        <>
          {/* <a className={css.socIcon} href={Header.instagram} target="_blank" rel="noopener noreferrer">
            <SiInstagram size="32px" />
          </a> */}
          <a
            className={css.socIcon}
            href={Header.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size="32px" />
          </a>
        </>
      ) : (
        <>
          <a
            className={css.socIcon}
            href={Header.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size="32px" />
          </a>
          {/* <a className={css.socIcon} href={Header.instagram} target="_blank" rel="noopener noreferrer">
            <SiInstagram size="32px" />
          </a> */}
        </>
      )}
    </div>
  );
}
