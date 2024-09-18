import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import CustomButton from "../CustomButton/CustomButton";
import SectionContainer from "../SectionContainer/SectionContainer";
import ua from "../../../messages/uk.json";
import cardImages from "../../../public/Images/image";
import style from "./News.module.css";
import { oldStandardTT, montserrat } from "../fonts";

const News = () => {
  return (
    <SectionContainer>
      <div className={style.wrapper}>
        <h2 className={`${oldStandardTT.className} ${style.title}`}>
          {ua.News.title}
        </h2>
        <ul className={style.list}>
          {ua.News.card.map((card) => {
            return (
              <li key={card.cardId} className={style.listItem}>
                <a href={"/"} className={style.linkCard}>
                  <Image
                    src={cardImages.cardImg1}
                    alt="Card background image"
                    loading="lazy"
                  />
                  <div className={style.contentCard}>
                    <div className={style.contentWrap}>
                      <div className={style.upRightArrowWrap}>
                        <FiArrowUpRight className={style.upRightArrow} />
                      </div>
                      <div
                        className={`${montserrat.className} ${style.titleInfoWrap}`}
                      >
                        <h3 className={style.cardTitle}>{card.cardTitle}</h3>
                        <p className={style.data}>{card.publicationData}</p>
                        <p className={style.fondName}>{card.fondName}</p>
                      </div>
                    </div>
                    <p>{card.info}</p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <CustomButton link={"/"} text={ua.News.button} />
      </div>
    </SectionContainer>
  );
};

export default News;
