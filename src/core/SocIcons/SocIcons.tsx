import { FaFacebook } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";

import css from "./SocIcons.module.css";

type PropsType = {
  footer?: boolean;
};

export default function SocIcons({ footer = false }: PropsType) {
  return (
    <div className={css.wrap}>
      {footer ? (
        <>
          <a
            className={css.socIcon}
            href="https://www.instagram.com/_v_i_t_o_k__/"
          >
            <SiInstagram size="32px" />
          </a>
          <a
            className={css.socIcon}
            href="https://www.facebook.com/openplanet.ua"
          >
            <FaFacebook size="32px" />
          </a>
        </>
      ) : (
        <>
          <a
            className={css.socIcon}
            href="https://www.facebook.com/openplanet.ua"
          >
            <FaFacebook size="32px" />
          </a>
          <a
            className={css.socIcon}
            href="https://www.instagram.com/_v_i_t_o_k__/"
          >
            <SiInstagram size="32px" />
          </a>
        </>
      )}
    </div>
  );
}
