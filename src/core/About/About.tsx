import Container from "../Container/Container";
import Section from "../Section/Section";
import Title from "../Title/Title";

import { montserrat, playfairDisplay } from "../fonts";
import css from "./About.module.css";

export default function About() {
  return (
    <Section>
      <Container>
        <Title text="Про фонд" />
        <p className={`${montserrat.className} ${css.discription}`}>
          Ми надаємо допомогу та підтримку людям у найскладніших життєвих
          обставинах, зміцнюючи їхню життєстійкість та віру у власні сили.
          Прагнемо створити сучасне суспільство, яке стає дедалі сильнішим,
          більш справедливим та рівноправним, де кожна людина має можливість
          жити гідно, отримувати необхідну підтримку та реалізовувати свій
          потенціал
        </p>
        <div>
          <h3 className={`${playfairDisplay.className} ${css.title}`}>
            наші цінності
          </h3>
          <ul>
            <li>
              <svg></svg>
              <div>
                <p className={`${montserrat.className} ${css.listTitle}`}>
                  Відкритість
                </p>
                <p className={`${montserrat.className} ${css.listDiscr}`}>
                  Ми завжди готові до організаційного розвитку, нових ідей та
                  партнерства. Також ми прозорі і підзвітні перед бенефіціарами,
                  місцевою громадою, владою, партнерами, донорами.
                </p>
              </div>
            </li>
            <li>
              <svg></svg>
              <div>
                <p className={`${montserrat.className} ${css.listTitle}`}>
                  Чесність
                </p>
                <p className={`${montserrat.className} ${css.listDiscr}`}>
                  Ми діємо виключно в інтересах людей, які потребують допомоги,
                  і не залежимо від чиїхось політичних, економічних, військових
                  або інших цілей.
                </p>
              </div>
            </li>
            <li>
              <svg></svg>
              <div>
                <p className={`${montserrat.className} ${css.listTitle}`}>
                  Незалежність
                </p>
                <p className={`${montserrat.className} ${css.listDiscr}`}>
                  Ми діємо виключно в інтересах людей, які потребують допомоги,
                  і не залежимо від чиїхось політичних, економічних, військових
                  або інших цілей.
                </p>
              </div>
            </li>
            <li>
              <svg></svg>
              <div>
                <p className={`${montserrat.className} ${css.listTitle}`}>
                  Емпатія
                </p>
                <p className={`${montserrat.className} ${css.listDiscr}`}>
                  Ми діємо виключно в інтересах людей, які потребують допомоги,
                  і не залежимо від чиїхось політичних, економічних, військових
                  або інших цілей. На першому місці для нас стоїть любов та
                  повага до людини.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Container>
      <div>
        <h3></h3>
      </div>
    </Section>
  );
}
