export const projectComponents = {
  ResponseProjects: {
    type: "object",
    properties: {
      ua: {
        type: "object",
        properties: {
          cardTitle: {
            type: "string",
            example: "Заголовок проекту українською",
          },
          mainImg: {
            type: "string",
            example: "https://example.com/main-image.jpg",
          },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "64d8c23eabf9123456789012",
                },
                sectionType: {
                  type: "string",
                  enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
                  example: "paragraph",
                },
                content: {
                  type: "mixed",
                  example: "Приклад контенту секції",
                },
              },
            },
          },
        },
      },
      en: {
        type: "object",
        properties: {
          cardTitle: {
            type: "string",
            example: "Project Title in English",
          },
          mainImg: {
            type: "string",
            example: "https://example.com/main-image.jpg",
          },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "64d8c23eabf9123456789012",
                },
                sectionType: {
                  type: "string",
                  enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
                  example: "paragraph",
                },
                content: {
                  type: "mixed",
                  example: "Example section content",
                },
              },
            },
          },
        },
      },
      isPosted: {
        type: "boolean",
        example: false,
      },
      workDirectionsType: {
        type: "array",
        items: {
          type: "string",
          enum: ["medicine", "electric", "education", "restoration", "culture"],
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
  RequestProjects: {
    type: "object",
    properties: {
      ua: {
        type: "object",
        properties: {
          cardTitle: {
            type: "string",
            example: "Заголовок проекту українською",
          },
          mainImg: {
            type: "string",
            example: "https://example.com/main-image.jpg",
          },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "64d8c23eabf9123456789012",
                },
                sectionType: {
                  type: "string",
                  enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
                  example: "title",
                },
                content: {
                  type: "mixed",
                  example: "Приклад контенту секції",
                },
              },
            },
          },
        },
      },
      en: {
        type: "object",
        properties: {
          cardTitle: {
            type: "string",
            example: "Project Title in English",
          },
          mainImg: {
            type: "string",
            example: "https://example.com/main-image.jpg",
          },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  example: "64d8c23eabf9123456789012",
                },
                sectionType: {
                  type: "string",
                  enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
                  example: "title",
                },
                content: {
                  type: "mixed",
                  example: "Example section content",
                },
              },
            },
          },
        },
      },
      isPosted: {
        type: "boolean",
        example: false,
      },
      workDirectionsType: {
        type: "array",
        items: {
          type: "string",
          enum: ["medicine", "electric", "education", "restoration", "culture"],
          example: "education",
        },
      },
    },
  },
};
