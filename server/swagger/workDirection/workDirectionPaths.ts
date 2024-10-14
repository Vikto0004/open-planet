export const workDirectionPaths = {
  "/api/work-direction": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Create work direction",
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
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
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
  "/api/{lang}/work-direction": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Get work direction cards",
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
          description: "Work direction type",
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
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirectionByLanguage",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  "/api/work-direction/{id}": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Get work direction card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
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
      tags: ["Home - Work direction"],
      summary: "Update work direction card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
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
              $ref: "#/components/schemas/RequestWorkDirection",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "Work direction updated",
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
      tags: ["Home - Work direction"],
      summary: "Delete work direction card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "Work direction deleted",
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
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Create new text section",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        description: "The request body must be empty",
        required: false,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {},
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/work-direction/img/{id}": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Upload work direction card main image",
      description: "Add image to the work direction card",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
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
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
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
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Delete work direction card main image",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
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
  "/api/work-direction/images/{id}": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Upload work direction card images",
      description: "Add images to the work direction card",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
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
                files: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
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
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Delete work direction card image",
      description: "Send object with image url",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
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
              type: "object",
              example: {
                imageUrl: "https://example.com/image.jpg",
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
                  },
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
  "/api/work-direction/{id}/{textSectionId}": {
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Home - Work direction"],
      summary: "Delete work direction card",
      description: "Send an empty request body",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Work direction ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "textSectionId",
          in: "path",
          required: true,
          description: "Text section ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with work direction content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseWorkDirection",
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
