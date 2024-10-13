import * as Yup from "yup";

export const firstFormSchema = Yup.object().shape({
  cardTitle: Yup.string().required("Придумайте заголовок"),
  mainImg: Yup.string().required("Виберіть картинку"),
  workDirectionsType: Yup.string().required("Виберіть тип"),
});
