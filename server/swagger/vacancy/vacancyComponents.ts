export const vacancyComponents = {
  ResponseVacancy: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "64d8c23eabf9123456789012",
      },
      ua: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Заголовок вакансії",
          },
          employment: {
            type: "string",
            example: "Повний робочий день",
          },
          region: {
            type: "string",
            example: "Волинь",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {},
                },
                href: { type: "string", example: "" },
                content: {
                  type: "string",
                  example: "",
                },
                children: [
                  {
                    type: "object",
                    example: {},
                  },
                ],
              },
            ],
          },
        },
      },
      en: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Vacancy Title",
          },
          employment: {
            type: "string",
            example: "Full-time",
          },
          region: {
            type: "string",
            example: "Volyn",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {},
                },
                href: { type: "string", example: "" },
                content: {
                  type: "string",
                  example: "",
                },
                children: [
                  {
                    type: "object",
                    example: {},
                  },
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
  ResponseVacancyPost: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "64d8c23eabf9123456789012",
      },
      ua: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Заголовок вакансії",
          },
          employment: {
            type: "string",
            example: "Повний робочий день",
          },
          region: {
            type: "string",
            example: "Волинь",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {},
                },
                href: { type: "string", example: "" },
                content: {
                  type: "string",
                  example: "",
                },
                children: [
                  {
                    type: "object",
                    example: {},
                  },
                ],
              },
            ],
          },
        },
      },
      en: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Vacancy Title",
          },
          employment: {
            type: "string",
            example: "Full-time",
          },
          region: {
            type: "string",
            example: "Volyn",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {},
                },
                href: { type: "string", example: "" },
                content: {
                  type: "string",
                  example: "",
                },
                children: [
                  {
                    type: "object",
                    example: {},
                  },
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
  RequestVacancyPost: {
    type: "object",
    properties: {
      ua: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Заголовок вакансії",
          },
          employment: {
            type: "string",
            example: "Повний робочий день",
          },
          region: {
            type: "string",
            example: "Волинь",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {},
                },
                href: { type: "string", example: "" },
                content: {
                  type: "string",
                  example: "",
                },
                children: [
                  {
                    type: "object",
                    example: {},
                  },
                ],
              },
            ],
          },
        },
        required: ["title", "employment", "region", "description"],
      },
      en: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Vacancy Title",
          },
          employment: {
            type: "string",
            example: "Full-time",
          },
          region: {
            type: "string",
            example: "Volyn",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {},
                },
                href: { type: "string", example: "" },
                content: {
                  type: "string",
                  example: "",
                },
                children: [
                  {
                    type: "object",
                    example: {},
                  },
                ],
              },
            ],
          },
        },
        required: ["title", "employment", "region", "description"],
      },
    },
  },
  RequestLocalizedVacancy: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Vacancy Title",
      },
      employment: {
        type: "string",
        example: "Full-time",
      },
      region: {
        type: "string",
        example: "Volyn",
      },
      description: {
        type: "array",
        example: [
          {
            tag: { type: "string", example: "div" },
            className: { type: "string", example: "container" },
            style: {
              type: "object",
              example: {},
            },
            href: { type: "string", example: "" },
            content: {
              type: "string",
              example:
                "Lorem ipsum dolor sit amet consectetur. Lacus pellentesque enim integer in magnis enim. Etiam aenean pulvinar non sed at morbi. Tristique interdum nisl risus elementum rhoncus justo. Viverra et risus facilisi dignissim.",
            },
            children: [
              {
                type: "object",
                example: {},
              },
            ],
          },
        ],
      },
    },
  },
  ResponseLocalizedVacancy: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "64d8c23eabf9123456789012",
      },
      en: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Vacancy Title",
          },
          employment: {
            type: "string",
            example: "Full-time",
          },
          region: {
            type: "string",
            example: "Volyn",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "div" },
                className: { type: "string", example: "container" },
                style: {
                  type: "object",
                  example: {
                    fontWeight: "500px",
                  },
                },
                href: { type: "string", example: "http://example.com" },
                content: {
                  type: "string",
                  example:
                    "Lorem ipsum dolor sit amet consectetur. Lacus pellentesque enim integer in magnis enim. Etiam aenean pulvinar non sed at morbi. Tristique interdum nisl risus elementum rhoncus justo. Viverra et risus facilisi dignissim.",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "p" },
                      className: { type: "string", example: "paragraph" },
                      style: {
                        type: "object",
                        example: {
                          fontWeight: "600px",
                        },
                      },
                      href: { type: "string", example: "http://example.com" },
                      content: {
                        type: "string",
                        example:
                          "Lorem ipsum dolor sit amet consectetur. Lacus pellentesque enim integer in magnis enim. Etiam aenean pulvinar non sed at morbi. Tristique interdum nisl risus elementum rhoncus justo. Viverra et risus facilisi dignissim.",
                      },
                    },
                  },
                ],
              },
            ],
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
};
