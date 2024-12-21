import { useValidLang } from "@/utils/hooks";

import DocRepCard from "../DocRepCard/DocRepCard";

import styles from "./DocRepList.module.css";

interface IInfo {
  cardTitle: string;
  publicationData: string;
  btnName: string;
  link: string;
}

interface IItem {
  id: string;
  en: IInfo;
  ua: IInfo;
}

type Props = {
  data: Array<IItem>;
};

export default function DocRepList({ data }: Props) {
  const lang = useValidLang();

  return (
    <ul className={styles.list}>
      {data.map((obj) => {
        const { id } = obj;
        const card = obj[lang];
        return (
          <li key={id} className={styles.item}>
            <DocRepCard card={card} />
          </li>
        );
      })}
    </ul>
  );
}
