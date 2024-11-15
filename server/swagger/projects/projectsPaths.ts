export const projectsPaths = {
  "/api/projects": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Create project",
      description: "Send an empty request body",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Language",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Object with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProject",
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
  "/api/{lang}/projects": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Get project cards",
      description: "Send an empty request body",
      parameters: [
        {
          name: "lang",
          in: "path",
          required: true,
          description: "Language",
          schema: {
            type: "string",
            enum: ["en", "ua"],
            example: "en",
          },
        },
        {
          name: "type",
          in: "query",
          description: "Projects type",
          schema: {
            type: "string",
            enum: [
              "medicine",
              "electric",
              "education",
              "restoration",
              "culture",
            ],
            example: "medicine",
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
          description: "Object with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProjectByLanguage",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/projects/{id}": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Get project card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProject",
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
      tags: ["Projects"],
      summary: "Update project card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Project ID",
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
              $ref: "#/components/schemas/RequestProject",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "Project updated",
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
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Delete project card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "Project deleted",
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
  "/api/projects/img/{id}": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Upload project card main image",
      description: "Add image to the project card",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProject",
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
};
