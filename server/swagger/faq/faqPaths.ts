export const faqPaths = {
  "/api/{lang}/faq": {
    get: {
      tags: ["Home - Faq"],
      summary: "Get all faqs",
      description: "Get all faqs",
      parameters: [
        {
          name: "lang",
          in: "path",
          required: true,
          description: "Language",
          schema: {
            type: "string",
            enum: ["en", "uk"],
            example: "en",
          },
        },
      ],
      responses: {
        200: {
          description: "Get all faqs by language",
          content: {
            "application/json": {
              schema: {
                properties: {
                  faq: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/ResponseFaq",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/faq": {
    post: {
      tags: ["Home - Faq"],
      summary: "Create new faq",
      description: "Create new faq",
      security: [{ cookieAuth: [] }],
      requestBody: {
        description: "Create new faq",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RequestCreateFaq",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Create new faq",
          content: {
            "application/json": {
              schema: {
                properties: {
                  faq: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseFaq",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/faq/{faqId}": {
    put: {
      tags: ["Home - Faq"],
      summary: "Update faq",
      description: "Update faq",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "faqId",
          in: "path",
          required: true,
          description: "Faq ID",
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
              $ref: "#/components/schemas/RequestUpdateFaq",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Update faq",
          content: {
            "application/json": {
              schema: {
                properties: {
                  faq: {
                    type: "object",
                    $ref: "#/components/schemas/ResponseFaq",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
