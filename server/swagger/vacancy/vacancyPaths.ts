import { langs } from "@/i18n/routing";

export const vacancyPaths = {
  "/api/vacancy": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Vacancy"],
      summary: "Create a vacancy",
      description: "Send a request body",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RequestVacancyPost",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Object with vacancy content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseVacancyPost",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Not found",
        },
      },
    },
  },
  "/api/{lang}/vacancy": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Vacancy"],
      summary: "Get a vacancy cards by lang",
      description: "Send an empty request body",
      parameters: [
        {
          name: "lang",
          in: "path",
          required: true,
          description: "Language",
          schema: {
            type: "string",
            enum: [...langs],
            example: "en",
          },
        },
        {
          name: "page",
          in: "query",
          required: true,
          description: "Page number for pagination",
          schema: {
            type: "integer",
            example: 1,
          },
        },
        {
          name: "limit",
          in: "query",
          required: true,
          description: "Number of items per page",
          schema: {
            type: "integer",
            example: 10,
          },
        },
      ],
      responses: {
        "200": {
          description: "Array objects with vacancy content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  vacancy: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ResponseLocalizedVacancy",
                    },
                  },
                  totalVacancy: {
                    type: "integer",
                    example: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/{lang}/vacancy/{id}": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Vacancy"],
      summary: "Get a vacancy card by lang",
      description: "Send an empty request body",
      parameters: [
        {
          name: "lang",
          in: "path",
          required: true,
          description: "Language",
          schema: {
            type: "string",
            enum: [...langs],
            example: "en",
          },
        },
        {
          name: "id",
          in: "path",
          required: true,
          description: "Vacancy ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with vacancy content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseLocalizedVacancy",
                  },
                },
              },
            },
          },
        },
      },
    },
    put: {
      security: [{ cookieAuth: [] }],
      tags: ["Vacancy"],
      summary: "Update a vacancy card by lang",
      description: "Send a request body",
      parameters: [
        {
          name: "lang",
          in: "path",
          required: true,
          description: "Language",
          schema: {
            type: "string",
            enum: [...langs],
            example: "en",
          },
        },
        {
          name: "id",
          in: "path",
          required: true,
          description: "Vacancy ID",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RequestLocalizedVacancy",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with vacancy content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "Vacancy updated",
                  },
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseLocalizedVacancy",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Not found",
        },
        "400": {
          description: "Bad request",
        },
      },
    },
  },
  "/api/vacancy/{id}": {
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Vacancy"],
      summary: "Delete a vacancy",
      description: "Add an empty body",
      parameters: [
        {
          name: "vacancyId",
          in: "path",
          required: true,
          description: "Vacancy ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Vacancy is deleted",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseVacancy",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Failed to delete vacancy",
        },
      },
    },
  },
};
