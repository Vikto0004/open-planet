"use client";

import { Field, Form, Formik } from "formik";
import css from "./home.module.css";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.section}>
        <h2 className={css.sectionTitle}>Вступна частина</h2>
        <Formik
          initialValues={{
            heroTitle: "",
            heroDescr: "",
          }}
          onSubmit={() => {}}
        >
          <Form className={css.form}>
            <div>
              <h3 className={css.title}>Заголовок:</h3>
              <Field name="heroTitle" className={css.input} />
            </div>
            <div>
              <h3 className={css.title}>Слоган:</h3>
              <Field name="heroDescr" className={css.input} />
            </div>
          </Form>
        </Formik>
      </div>
      <div className={css.section}>
        <Link className={css.link} href="/admin/programs">
          Напрямки роботи фонду
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
      <div className={css.section}>
        <Link className={css.link} href="/admin/news">
          Новини фонду
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
      <div className={css.section}>
        <h2 className={css.sectionTitle}>Про фонд</h2>
        <Formik
          initialValues={{
            aboutDescr: "",
          }}
          onSubmit={() => {}}
        >
          <Form className={css.form}>
            <div>
              <h3 className={css.title}>Заголовок:</h3>
              <Field name="heroTitle" className={css.input} />
            </div>
            <div>
              <h3 className={css.title}>Опис:</h3>
              <Field name="heroDescr" className={css.input} />
            </div>
          </Form>
        </Formik>
      </div>
      <div className={css.section}>
        <Link className={css.link} href="/admin/faq">
          Відповіді на часті запитання
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
