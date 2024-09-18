import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useParams } from "next/navigation";
import { montserrat, oldStandardTT } from "../fonts";
import style from "./NewsCard.module.css";

interface NewsCard {
  cardId: number;
  image: string;
  cardTitle: string;
  publicationData: string;
  fondName: string;
  info: string;
}

interface NewsCardProps {
  card: NewsCard;
}

const NewsCard = ({ card }: NewsCardProps) => {
  const { lang } = useParams();

  return (
    <li key={card.cardId} className={style.listItem}>
      <a href={`${lang}/news`} className={style.linkCard}>
        <Image
          src={card.image}
          width={400}
          height={500}
          alt="Card background image"
          loading="lazy"
        />
        <div className={`${montserrat.className} ${style.contentCard}`}>
          <div className={style.contentWrap}>
            <div className={style.upRightArrowWrap}>
              <FiArrowUpRight className={style.upRightArrow} />
            </div>
            <div className={style.titleInfoWrap}>
              <h3 className={`${oldStandardTT.className} ${style.cardTitle}`}>
                {card.cardTitle}
              </h3>
              <p className={style.publicationData}>{card.publicationData}</p>
              <p className={style.fondName}>{card.fondName}</p>
            </div>
          </div>
          <p className={`${oldStandardTT.className} ${style.info}`}>
            {card.info}
          </p>
        </div>
      </a>
    </li>
  );
};

export default NewsCard;
