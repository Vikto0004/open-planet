import Image from "next/image";

import { support } from "@/utils/routes";

import calendarIcon from "../../../public/svgs/calendar.svg";
import Container from "../Container/Container";
import CustomButton from "../CustomButton/CustomButton";
import { inter, montserrat, oldStandardTT } from "../fonts";
import Section from "../Section/Section";

import css from "./AboutProject.module.css";

export default function AboutProject() {
  return (
    <Section style={css.section}>
      <Container>
        <h1 className={`${oldStandardTT.className} ${css.title}`}>
          Реконструкція бомбосховища для Школи №25
        </h1>
        <div className={css.dataWrapper}>
          <Image
            src={calendarIcon}
            width={16}
            height={16}
            alt="calendar icon"
            loading="lazy"
          />
          <p className={`${inter.className} ${css.publicationData}`}>
            28 серпня 2024
          </p>
        </div>
        <Image
          width={800}
          height={564}
          src={"https://i.ibb.co/9TXtNNF/Img-school.jpg"}
          alt="Реконструкція бомбосховища для Школи №25"
          className={css.mainImg}
        />
        <ul className={css.list}>
          <li className={`${montserrat.className} ${css.listItem}`}>
            Школа №25 була побудована у 1939 році за рекордні 3 місяці. Ця
            історична будівля знаходиться у центрі міста, біля знаменитої
            Андріївської церкви та особливою не тільки для працівників школи, а
            й для учнів та батьків. На сьогоднішній день у нашому навчальному
            закладі освіту здобуває 569 учні.
          </li>
          <li className={`${montserrat.className} ${css.listItem}`}>
            Наразі, у звʼязку з воєнним станом та постійними ракетними атаками,
            діти вимушені майже кожного дня спускатись до укриття. Як укриття
            використовується підвальне приміщення, яке не було спочатку
            призначене для цих цілей, і його поточний стан не відповідає жодним
            стандартам і не дозволяє дітям перебувати там хоча б у якихось
            мінімально комфортних умовах.
          </li>
          <li className={`${montserrat.className} ${css.listItem}`}>
            На жаль, держава не може в повному обсязі профінансувати капітальний
            ремонт приміщень. Безпека дітей є пріорітетною для Школи, тому
            керівництво звертається за підтримкою до всіх небайдужих.
          </li>
        </ul>
        <div className={css.wrap}>
          <h3 className={`${oldStandardTT.className} ${css.subtitle}`}>
            Мета проєкту (І етап) :
          </h3>
          <p className={`${montserrat.className} ${css.listItem}`}>
            Переобладнати старе підвальне приміщення школи в сучасне укриття,
            щоб усі діти та вчителі мали змогу безпечно перебувати там під час
            повітряних тривог.
          </p>
          <h3 className={`${oldStandardTT.className} ${css.subtitle}`}>
            Бюджет та необхілне фінансування (І етап)
          </h3>
          <ul className={css.listFinanc}>
            <li className={css.listFinancItem}>
              <p
                className={`${oldStandardTT.className} ${css.listFinancDiscr}`}
              >
                Капітальний ремонт укриття за проєктом
              </p>
              <p className={`${montserrat.className} ${css.listFinancTitle}`}>
                4,055, 528 грн
              </p>
            </li>
            <li className={css.listFinancItem}>
              <p
                className={`${oldStandardTT.className} ${css.listFinancDiscr}`}
              >
                Виділено коштів
              </p>
              <p className={`${montserrat.className} ${css.listFinancTitle}`}>
                1, 583, 543 грн
              </p>
            </li>
            <li className={css.listFinancItem}>
              <p
                className={`${oldStandardTT.className} ${css.listFinancDiscr}`}
              >
                Не вистачає коштів
              </p>
              <p className={`${montserrat.className} ${css.listFinancTitle}`}>
                2, 392, 242 грн
              </p>
            </li>
          </ul>
          <ul className={css.listDisrc}>
            <li className={`${montserrat.className} ${css.listItem}`}>
              Наразі виконуються роботи з встановлення двох санітарних вузлів,
              системи вентиляції та шпаклювання 30% стін. Не вистачає коштів на
              заміну підлоги, шпаклювання 70% стін, на встановлення вхідних
              дверей в укриття, нової системи опалення та оновлення стелі.
            </li>
            <li className={`${montserrat.className} ${css.listItem}`}>
              У цей складний і невизначений час безпека наших дітей стає
              пріоритетом номер один. Ми звертаємося до вас із важливою
              ініціативою — створення сучасного і безпечного укриття для дітей.
              Це не просто інвестиція в інфраструктуру, це внесок у майбутнє
              нашої нації.
            </li>
            <li className={`${montserrat.className} ${css.listItem}`}>
              Щиро вдячні за вашу увагу та сподіваємось на вашу підтримку.
            </li>
          </ul>
        </div>
        <CustomButton style={css.button} text="Підтримати" link={support} />
      </Container>
    </Section>
  );
}
