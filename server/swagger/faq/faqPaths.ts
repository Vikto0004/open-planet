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
            enum: ["en", "ua"],
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
};
