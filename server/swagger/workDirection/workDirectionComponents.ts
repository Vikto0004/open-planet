export const workDirectionComponents = {
  ResponseWorkDirection: {
    type: "object",
    properties: {
      language: {
        type: "string",
        example: "uk",
      },
      cardTitle: {
        type: "string",
        example: "",
      },
      mainImg: {
        type: "string",
        example: "",
      },
      firstTitle: {
        type: "string",
        example: "",
      },
      firstDescription: {
        type: "string",
        example: "",
      },
      secondTitle: {
        type: "string",
        example: "",
      },
      secondDescription: {
        type: "string",
        example: "",
      },
      subtitleFirst: {
        type: "string",
        example: "",
      },
      porpuseText: {
        type: "string",
        example: "",
      },
      subtitleSecond: {
        type: "string",
        example: "",
      },
      workDirectionsType: {
        type: "array",
        items: {
          type: "string",
        },
      },
      images: {
        type: "array",
        items: {
          type: "string",
        },
      },
      _id: {
        $ref: "#/components/schemas/_id",
      },
      budjetsCards: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: {
          type: "object",
          properties: {
            _id: {
              $ref: "#/components/schemas/_id",
            },
            title: {
              type: "string",
              example: "",
            },
            emount: {
              type: "number",
              nullable: true,
            },
          },
        },
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2024-09-25T17:37:49.697Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2024-09-25T17:37:49.697Z",
      },
    },
  },
  RequestWorkDirection: {
    type: "object",
    properties: {
      cardTitle: {
        type: "string",
        example: "",
      },
      mainImg: {
        type: "string",
        example: "",
      },
      firstTitle: {
        type: "string",
        example: "",
      },
      firstDescription: {
        type: "string",
        example: "",
      },
      secondTitle: {
        type: "string",
        example: "",
      },
      secondDescription: {
        type: "string",
        example: "",
      },
      subtitleFirst: {
        type: "string",
        example: "",
      },
      porpuseText: {
        type: "string",
        example: "",
      },
      subtitleSecond: {
        type: "string",
        example: "",
      },
      workDirectionsType: {
        type: "array",
        items: {
          type: "string",
          example: "medecine",
        },
      },
      images: {
        type: "array",
        items: {
          type: "string",
        },
      },
      budjetsCards: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "",
            },
            emount: {
              type: "number",
              nullable: true,
              example: 123,
            },
          },
        },
      },
    },
  },
};
