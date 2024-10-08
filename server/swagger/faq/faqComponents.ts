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
      isPosted: {
        type: "boolean",
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
      isPosted: {
        type: "boolean",
        default: false,
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
      isPosted: {
        type: "boolean",
      },
    },
  },
};
