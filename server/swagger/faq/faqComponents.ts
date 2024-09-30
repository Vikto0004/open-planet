export const faqComponents = {
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
