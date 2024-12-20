"use client";
import Image from "next/image";

import styles from "./DocRepCard.module.css";

interface Card {
  cardTitle: string;
  publicationData: string;
  btnName: string;
}

type Props = {
  card: Card;
};

export default function DocRepCard({ card }: Props) {
  const { cardTitle, publicationData, btnName } = card;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/pdf/lorem-ipsum.pdf";
    link.download = `${cardTitle}.pdf`;
    link.click();
  };

  return (
    <>
      <div className={styles.card}>
        <p>{publicationData}</p>
        <h3 className={styles.title}>{cardTitle}</h3>
        <button className={styles.btn} onClick={handleDownload}>
          <Image
            src="/svgs/generate-pdf.svg"
            alt="Download"
            width={32}
            height={32}
            className={styles.icon}
          />
          {btnName}
        </button>
      </div>
    </>
  );
}
