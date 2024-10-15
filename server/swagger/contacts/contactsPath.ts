export const contactsPath = {
  "/api/{lang}/contacts": {
    get: {
      tags: ["Home - Contacts"],
      summary: "Get contacts",
      description: "Get contacts",
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
          description: "Get contacts by language",
          content: {
            "application/json": {
              schema: {
                properties: {
                  contacts: {
                    type: "object",
                    $ref: "#/components/schemas/ContactsResponse",
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
      tags: ["Home - Contacts"],
      summary: "Create contacts",
      description: "Send an empty request body",
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ContactsRequest",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Object with contacts content",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ContactsResponse",
              },
            },
          },
        },
        400: {
          description: "Bad request",
        },
      },
    },
  },
};
