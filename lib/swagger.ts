import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Next.js API Documentation",
      },
      tags: [
        {
          name: "Auth",
          description: "Authorization and user endpoints",
        },
      ],
      paths: {
        "/auth/register": {
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

        "/auth/login": {
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

        "/auth/logout": {
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
      },
      components: {
        schemas: {
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
        },
      },
    },
  });
  return spec;
};
