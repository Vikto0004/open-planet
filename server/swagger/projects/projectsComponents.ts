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
                  example: ["Приклад контенту секції", "Приклад контенту секції", "Приклад контенту секції"],
                },
              },
            },
            example: [
              {
                id: "64d8c23eabf9123456789012",
                sectionType: "title",
                content: "Заголовок проекту",
              },
              {
                id: "64d8c23eabf9123456789013",
                sectionType: "paragraph",
                content: ["Опис проекту українською мовою", "Опис проекту українською мовою", "Опис проекту українською мовою"],
              },
              {
                id: "64d8c23eabf9123456789014",
                sectionType: "imageList",
                content: [
                  "https://example.com/image1.jpg",
                  "https://example.com/image2.jpg",
                ],
              },
            ],
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
                  example: ["Example section content", "Example section content", "Example section content"],
                },
              },
            },
            example: [
              {
                id: "64d8c23eabf9123456789012",
                sectionType: "title",
                content: "Project Title",
              },
              {
                id: "64d8c23eabf9123456789013",
                sectionType: "paragraph",
                content: ["Example section content", "Example section content", "Example section content"],
              },
              {
                id: "64d8c23eabf9123456789014",
                sectionType: "imageList",
                content: [
                  "https://example.com/image1.jpg",
                  "https://example.com/image2.jpg",
                ],
              },
            ],
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
  ResponseProjectsPost: {
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
            example: "",
          },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                sectionType: {
                  type: "string",
                  enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
                },
                content: {
                  type: "mixed",
                },
              },
            },
            example: [],
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
            example: "",
          },
          sections: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                sectionType: {
                  type: "string",
                  enum: ["paragraph", "title", "subtitle", "budgetCards", "imageList"],
                },
                content: {
                  type: "mixed",
                },
              },
            },
            example: []
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
          example: "education"
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
                  example: "paragraph",
                },
                content: {
                  type: "mixed",
                  example: ["Приклад контенту секції", "Приклад контенту секції", "Приклад контенту секції"],
                },

              },
            },
            example: [
              {
                id: "64d8c23eabf9123456789012",
                sectionType: "title",
                content: "Заголовок проекту",
              },
              {
                id: "64d8c23eabf9123456789013",
                sectionType: "paragraph",
                content: ["Опис проекту українською мовою", "Опис проекту українською мовою", "Опис проекту українською мовою"],
              },
              {
                id: "64d8c23eabf9123456789014",
                sectionType: "imageList",
                content: [
                  "https://example.com/image1.jpg",
                  "https://example.com/image2.jpg",
                ],
              },
            ],
          },
        },
        required: ["cardTitle"],
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
                  example: ["Example section content", "Example section content", "Example section content"],
                },
              },
            },
            example: [
              {
                id: "64d8c23eabf9123456789012",
                sectionType: "title",
                content: "Project Title",
              },
              {
                id: "64d8c23eabf9123456789013",
                sectionType: "paragraph",
                content: ["Example section content", "Example section content", "Example section content"],
              },
              {
                id: "64d8c23eabf9123456789014",
                sectionType: "imageList",
                content: [
                  "https://example.com/image1.jpg",
                  "https://example.com/image2.jpg",
                ],
              },
            ],
          },
        },
        required: ["cardTitle"],
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
  RequestProjectsPost: {
    type: "object",
    properties: {
      ua: {
        type: "object",
        properties: {
          cardTitle: {
            type: "string",
            example: "Заголовок проекту українською",
          },
        },
        required: ["cardTitle"],
      },
      en: {
        type: "object",
        properties: {
          cardTitle: {
            type: "string",
            example: "Project Title in English",
          },
        },
        required: ["cardTitle"],
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
  LocalizedProject: {
    type: "object",
    properties: {
      cardTitle: {
        type: "string",
        example: "Project Title",
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
              example: ["Example section content", "Example section content", "Example section content"],
            },
          },
        },
      },
    },
  },
};
