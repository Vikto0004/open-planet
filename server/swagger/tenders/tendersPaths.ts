import { langs } from "@/i18n/routing";

export const tendersPaths = {
  "/api/tenders": {
    post: {
      security: [{ cookieAuth: [] }],
      tags: ["Tenders"],
      summary: "Create a tender",
      description: "Send a request body",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RequestTendersPost",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Object with tender content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseTendersPost",
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
  "/api/{lang}/tenders": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Tenders"],
      summary: "Get a tenders cards by lang",
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
          description: "Array objects with tenders content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  vacancy: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ResponseLocalizedTender",
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
  "/api/{lang}/tenders/{id}": {
    get: {
      security: [{ cookieAuth: [] }],
      tags: ["Tenders"],
      summary: "Get a tender card by lang and id",
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
          description: "Tender ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Object with tender content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseLocalizedTender",
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
      tags: ["Tenders"],
      summary: "Update a tender card by lang and id",
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
          description: "Tender ID",
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
              $ref: "#/components/schemas/RequestLocalizedTender",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with tender content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "tender updated",
                  },
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseLocalizedTender",
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
  "/api/{lang}/tenders/{id}/description": {
    put: {
      security: [{ cookieAuth: [] }],
      tags: ["Tenders"],
      summary: "Update description in tender card by lang",
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
          description: "Tender ID",
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
              $ref: "#/components/schemas/RequestLocalizedTenderDescr",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Object with tender content",
          content: {
            "application/json": {
              schema: {
                properties: {
                  message: {
                    type: "string",
                    example: "Tender description has been successfully updated",
                  },
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseLocalizedTender",
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
  "/api/tenders/{id}": {
    delete: {
      security: [{ cookieAuth: [] }],
      tags: ["Tenders"],
      summary: "Delete a tender",
      description: "Add an empty body",
      parameters: [
        {
          name: "tenderId",
          in: "path",
          required: true,
          description: "Tender ID",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Tender is deleted",
          content: {
            "application/json": {
              schema: {
                properties: {
                  response: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseTender",
                  },
                },
              },
            },
          },
        },
        "500": {
          description: "Failed to delete tender",
        },
      },
    },
  },
};
