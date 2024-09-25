export const authComponents = {
  Login: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        format: "password",
      },
    },
  },
  Registration: {
    type: "object",
    required: ["email", "password", "confirmPassword"],
    properties: {
      username: {
        type: "string",
        format: "username",
      },
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        minLength: 6,
      },
      confirmPassword: {
        type: "string",
        minLength: 6,
      },
    },
  },
  ResponseRegister: {
    type: "object",
    properties: {
      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },
  ResponseLogin: {
    type: "object",
    properties: {
      user: {
        $ref: "#/components/schemas/User",
      },
      token: {
        $ref: "#/components/schemas/Token",
      },
    },
  },
};
