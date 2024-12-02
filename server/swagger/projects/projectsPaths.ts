export const projectsPaths = {
  "/api/projects": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Create project",
      description: "Send a request body",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RequestProjectsPost",
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
                    $ref: "#/components/schemas/ResponseProjectsPost",
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
      summary: "Get project cards by lang",
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
              "all"
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
          description: "Array ofobjects with project content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "array",
                    items: { $ref: "#/components/schemas/ResponseLocalizedProject", }
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/{lang}/projects/{id}": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects"],
      summary: "Get project card by lang",
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
                    $ref: "#/components/schemas/ResponseLocalizedProject",
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
      summary: "Update project card by lang",
      description: "Send a request body",
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
              $ref: "#/components/schemas/RequestLocalizedProject",
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
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseLocalizedProject",
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
                    $ref: "#/components/schemas/ResponseProjects",
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
      description: "Send a request body",
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
              $ref: "#/components/schemas/RequestProjects",
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
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProjects",
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
          description: "Object with response",
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
  "/api/projects/img/{projectId}": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects - MainImg"],
      summary: "Upload project card main image",
      description: "Add image to the project card",
      parameters: [
        {
          name: "projectId",
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
                    $ref: "#/components/schemas/ResponseProjects",
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
      tags: ["Projects - MainImg"],
      summary: "Delete project card main image",
      description: "Send an empty body",
      parameters: [
        {
          name: "projectId",
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
                    $ref: "#/components/schemas/ResponseProjectsPost",
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
  "/api/projects/images/{projectId}/{sectionId}": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects - ImageList"],
      summary: "Upload project card images",
      description: "Add images to the project card",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "sectionId",
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
                files: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
              required: ["files"],
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
                    $ref: "#/components/schemas/ResponseProjects",
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
      tags: ["Projects - ImageList"],
      summary: "Delete project card image",
      description: "Add an image link",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "sectionId",
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
              type: "object",
              properties: {
                imageUrl: {
                  type: "string",
                  format: "uri",
                  example: "https://example.com/image.jpg",
                },
              },
              required: ["imageUrl"],
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
                    $ref: "#/components/schemas/ResponseProjects",
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
  "/api/projects/sections/{projectId}": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects - Section"],
      summary: "Add a section",
      description: "Add a type of section",
      parameters: [
        {
          name: "projectId",
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
                type: {
                  type: "string",
                  enum: [
                    "title",
                    "subtitle",
                    "paragraph",
                    "imageList",
                    "budgetCards"
                  ],
                },
              },
              required: ["type"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Section saved",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProjects",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Project not found",
        },
      },
    },
  },
  "/api/projects/sections/{projectId}/{sectionId}": {
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects - Section"],
      summary: "Delete a section",
      description: "Add an empty body",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "sectionId",
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
          description: "Section is deleted",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProjects",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Failed to delete section",
        },
      },
    },
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects - BudgetCard"],
      summary: "Add budget card",
      description: "Add an empty body",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "sectionId",
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
          description: "Budget card saved",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProjects",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Section not found",
        },
      },
    },
  },
  "/api/projects/sections/{projectId}/{sectionId}/{budgetCardId}": {
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Projects - BudgetCard"],
      summary: "Delete budget card",
      description: "Add an empty body",
      parameters: [
        {
          name: "projectId",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "sectionId",
          in: "path",
          required: true,
          description: "Project ID",
          schema: {
            type: "string",
          },
        },
        {
          name: "budgetCardId",
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
          description: "Budget card deleted",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseProjects",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Failed to delete budget card",
        }
      },
    },
  },
};
