export const helpComponents = {
  User: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      email: {
        type: "string",
      },
      id: {
        type: "string",
      },
    },
  },
  Token: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
    },
  },
  Language: {
    type: "object",
    properties: {
      language: {
        type: "string",
      },
    },
  },
  _id: {
    type: "object",
    properties: {
      _id: {
        type: "string",
      },
    },
  },
};
