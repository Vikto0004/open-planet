import * as Yup from "yup";

export const firstFormSchema = Yup.object().shape({
  ua: Yup.object().shape({
    cardTitle: Yup.string().required("Придумайте заголовок на українській"),
  }),
  en: Yup.object().shape({
    cardTitle: Yup.string().required("Придумайте заголовок на англійській"),
  }),
  workDirectionsType: Yup.array()
    .of(
      Yup.string().oneOf([
        "medicine",
        "electric",
        "education",
        "restoration",
        "culture",
      ]),
    )
    .default(["medicine"]),
});

export const sectionSchema = Yup.object().shape({
  id: Yup.string().required("ID is required"),
  sectionType: Yup.string()
    .oneOf(
      ["title", "paragraph", "list", "budgetCards", "imageList", "subtitle"],
      "Invalid section type",
    )
    .required("Type is required"),
  content: Yup.lazy((_, options) => {
    const { parent } = options as { parent: { type: string } };

    switch (parent.type) {
      case "title":
        return Yup.string().required("Title content is required");
      case "subtitle":
        return Yup.string().required("Subtitle content is required");
      case "paragraph":
        return Yup.string().required("Paragraph content is required");
      case "budgetCards":
        return Yup.array()
          .of(
            Yup.object().shape({
              _id: Yup.string().required("ID is required"),
              title: Yup.string().required("Title is required"),
              amount: Yup.number().required("Amount is required"),
            }),
          )
          .required("Budget cards content is required");
      case "imageList":
        return Yup.array()
          .of(Yup.string().url("Each image must be a valid URL"))
          .required("Image list content is required");
      default:
        return Yup.mixed().notRequired();
    }
  }),
});

export const editFormSchema = Yup.object().shape({
  _id: Yup.string().required("ID is required"),
  ua: Yup.object().shape({
    cardTitle: Yup.string().required("UA card title is required"),
    mainImg: Yup.string()
      .url("Main image must be a valid URL")
      .required("UA main image is required"),
    sections: Yup.array().of(sectionSchema),
  }),
  en: Yup.object().shape({
    cardTitle: Yup.string().required("EN card title is required"),
    mainImg: Yup.string()
      .url("Main image must be a valid URL")
      .required("EN main image is required"),
    sections: Yup.array().of(sectionSchema),
  }),
  workDirectionsType: Yup.array()
    .of(
      Yup.string().oneOf([
        "medicine",
        "electric",
        "education",
        "restoration",
        "culture",
      ]),
    )
    .default(["medicine"]),
  isPosted: Yup.boolean().required("IsPosted flag is required"),
});
