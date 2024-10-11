export const workDirectionComponents = {
  ResponseWorkDirection: {
    type: "object",
    properties: {
      language: {
        type: "string",
        example: "uk",
      },
      isPosted: {
        type: "boolean",
        example: false,
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
      thirdTitle: {
        type: "string",
        example: "",
      },
      thirdDescription: {
        type: "string",
        example: "",
      },
      fourthTitle: {
        type: "string",
        example: "",
      },
      fourthDescription: {
        type: "string",
        example: "",
      },
      fifthTitle: {
        type: "string",
        example: "",
      },
      fifthDescription: {
        type: "string",
        example: "",
      },
      sixthTitle: {
        type: "string",
        example: "",
      },
      sixthDescription: {
        type: "string",
        example: "",
      },
      seventhTitle: {
        type: "string",
        example: "",
      },
      seventhDescription: {
        type: "string",
        example: "",
      },
      eighthTitle: {
        type: "string",
        example: "",
      },
      eighthDescription: {
        type: "string",
        example: "",
      },
      ninthTitle: {
        type: "string",
        example: "",
      },
      ninthDescription: {
        type: "string",
        example: "",
      },
      tenthTitle: {
        type: "string",
        example: "",
      },
      proposeText: {
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
          example: "https://example.com/image.jpg",
        },
      },
      _id: {
        $ref: "#/components/schemas/_id",
      },
      budgetsCards: {
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
            amount: {
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
      isPosted: {
        type: "boolean",
        example: false,
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
      thirdTitle: {
        type: "string",
        example: "",
      },
      thirdDescription: {
        type: "string",
        example: "",
      },
      fourthTitle: {
        type: "string",
        example: "",
      },
      fourthDescription: {
        type: "string",
        example: "",
      },
      fifthTitle: {
        type: "string",
        example: "",
      },
      fifthDescription: {
        type: "string",
        example: "",
      },
      sixthTitle: {
        type: "string",
        example: "",
      },
      sixthDescription: {
        type: "string",
        example: "",
      },
      seventhTitle: {
        type: "string",
        example: "",
      },
      seventhDescription: {
        type: "string",
        example: "",
      },
      eighthTitle: {
        type: "string",
        example: "",
      },
      eighthDescription: {
        type: "string",
        example: "",
      },
      ninthTitle: {
        type: "string",
        example: "",
      },
      ninthDescription: {
        type: "string",
        example: "",
      },
      tenthTitle: {
        type: "string",
        example: "",
      },
      subtitleFirst: {
        type: "string",
        example: "",
      },
      proposeText: {
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
          example: "medicine",
        },
      },
      images: {
        type: "array",
        items: {
          type: "string",
        },
      },
      budgetsCards: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "",
            },
            amount: {
              type: "number",
              nullable: true,
              example: 123,
            },
          },
        },
      },
    },
  },
  ResponseWorkDirectionByLanguage: {
    type: "array",
    items: {
      type: "object",
      properties: {
        _id: {
          $ref: "#/components/schemas/_id",
        },
        language: {
          type: "string",
          example: "ua",
        },
        isPosted: {
          type: "boolean",
          example: false,
        },
        cardTitle: {
          type: "string",
          example: "",
        },
        mainImg: {
          type: "string",
          example: "",
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
  },
};
