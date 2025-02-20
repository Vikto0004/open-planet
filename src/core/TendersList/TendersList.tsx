import { Tenders } from "@/query/types/tenders";

import TendersCard from "../TendersCard/TendersCard";

import styles from "./TendersList.module.css";

type Props = {
  data: Tenders[];
};

export default function TendersList({ data }: Props) {
  return (
    <ul className={styles.list}>
      {data.map((obj) => (
        <TendersCard key={obj._id} card={obj} />
      ))}
    </ul>
  );
}
