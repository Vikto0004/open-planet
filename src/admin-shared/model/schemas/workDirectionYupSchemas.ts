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
    .oneOf([
      "title",
      "paragraph",
      "list",
      "budgetCards",
      "imageList",
      "subtitle",
    ])
    .required("Type is required"),
  amount: Yup.string().required("Amount is required"),

  content: Yup.lazy((value, options) => {
    const parent = options.parent as { sectionType: string };

    switch (parent.sectionType) {
      case "title":
      case "subtitle":
        return Yup.string().required(
          `${parent.sectionType} content is required`,
        );

      case "paragraph":
        return Yup.array()
          .of(Yup.string().required("Each paragraph must be a string"))
          .min(1, "At least one paragraph is required")
          .required("Paragraph content is required");

      case "budgetCards":
        return Yup.array()
          .of(
            Yup.object().shape({
              _id: Yup.string().required("ID is required"),
              title: Yup.string().required("Title is required"),
              amount: Yup.string().required("Amount is required"),
            }),
          )
          .min(1, "At least one budget card is required")
          .required("Budget cards content is required");

      case "imageList":
        return Yup.array()
          .of(Yup.string().url("Each image must be a valid URL"))
          .min(1, "At least one image URL is required")
          .required("Image list content is required");

      default:
        return Yup.mixed().notRequired();
    }
  }),
});

export const editFormSchema = Yup.object().shape({
  projectId: Yup.string().notRequired(),
  sectionId: Yup.string().required("Section ID is required"),
  budgetCardId: Yup.string().notRequired(),
  title: Yup.string().required("Title is required"),
  amount: Yup.string().required("Amount is required"),
  sectionType: Yup.string()
    .oneOf([
      "title",
      "paragraph",
      "list",
      "budgetCards",
      "imageList",
      "subtitle",
    ])
    .required("Type is required"),

  ua: Yup.object()
    .shape({
      cardTitle: Yup.string().required("UA card title is required"),
      mainImg: Yup.string()
        .url("Main image must be a valid URL")
        .required("UA main image is required"),
      sections: Yup.array()
        .of(sectionSchema)
        .min(1, "At least one UA section is required")
        .required("UA sections are required"),
    })
    .default({
      cardTitle: "",
      mainImg: "",
      sections: [],
    }),

  en: Yup.object()
    .shape({
      cardTitle: Yup.string().required("EN card title is required"),
      mainImg: Yup.string()
        .url("Main image must be a valid URL")
        .required("EN main image is required"),
      sections: Yup.array()
        .of(sectionSchema)
        .min(1, "At least one EN section is required")
        .required("EN sections are required"),
    })
    .default({
      cardTitle: "",
      mainImg: "",
      sections: [],
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
