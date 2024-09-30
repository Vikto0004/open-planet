export const faqComponents = {
  RequestUpdateFaq: {
    type: "object",
    properties: {
      question: {
        type: "string",
      },
      answer: {
        type: "string",
      },
    },
  },

  RequestCreateFaq: {
    type: "object",
    properties: {
      language: {
        type: "string",
        example: "en",
        enum: ["uk", "en"],
      },
    },
  },
  ResponseFaq: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
      question: {
        type: "string",
      },
      answer: {
        type: "string",
      },
      language: {
        type: "string",
      },
    },
  },
  RequestFaq: {
    type: "object",
    properties: {
      question: {
        type: "string",
      },
      answer: {
        type: "string",
      },
    },
  },
};
