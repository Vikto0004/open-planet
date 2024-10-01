export const authPaths = {
  "/api/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "User registration",
      description: "Register a new user",
      requestBody: {
        description: "Registration details",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Registration",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User registered",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResponseRegister",
              },
            },
          },
        },
        "409": {
          description: "Conflict - Email already exists",
        },
      },
    },
  },
  "/api/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "User login",
      description: "Authenticate a user and return a token",
      requestBody: {
        description: "Login details",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Login",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Successful login",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResponseLogin",
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
        },
      },
    },
  },

  "/api/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "User logout",
      description: "Log out the current user",
      responses: {
        "200": {
          description: "Successful logout",
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },

  "/api/auth/user": {
    get: {
      tags: ["Auth"],
      summary: "Get user data",
      description: "Get user data",
      security: [{ cookieAuth: [] }],
      responses: {
        "200": {
          description: "Get user data",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResponseUser",
              },
            },
          },
        },
        "401": {
          description: "User by token is not found",
        },
      },
    },
  },
};
