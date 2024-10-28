import * as Yup from "yup";

export const firstFormSchema = Yup.object().shape({
  cardTitle: Yup.string().required("Придумайте заголовок"),
  mainImg: Yup.string().required("Виберіть картинку"),
  workDirectionsType: Yup.string().required("Виберіть тип"),
});

export const editFormSchema = Yup.object().shape({
  cardTitle: Yup.string().required("Придумайте заголовок"),
  mainImg: Yup.string().required("Виберіть картинку"),
  workDirectionsType: Yup.string().required("Виберіть тип"),
  images: Yup.array(Yup.string()).required(),
  // budgetCards: Yup.array().of(
  //   Yup.object().shape({
  //     id: Yup.string().required(),
  //     title: Yup.string().required(),
  //     amount: Yup.number().required(),
  //   }),
  // ),
});
