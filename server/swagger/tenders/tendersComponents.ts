export const tendersComponets = {
  ResponseTender: {
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
            example: "Заголовок тендеру",
          },
          relevant: {
            type: "string",
            example: "Актуальність тентеру",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "ПОВІДОМЛЕННЯ-ЗГОДА НА ЗБІР, ОБРОБКУ ТА ВИКОРИСТАННЯ ПЕРСОНАЛЬНИХ ДАНИХ",
                      },
                    },
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
            example: "Tender title",
          },
          relevant: {
            type: "string",
            example: "The relevance of tenter",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "NOTICE-CONSENT TO THE COLLECTION, PROCESSING AND USE OF PERSONAL DATA",
                      },
                    },
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
  ResponseTendersPost: {
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
            example: "Заголовок тендеру",
          },
          relevant: {
            type: "string",
            example: "Актуальність тентеру",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "ПОВІДОМЛЕННЯ-ЗГОДА НА ЗБІР, ОБРОБКУ ТА ВИКОРИСТАННЯ ПЕРСОНАЛЬНИХ ДАНИХ",
                      },
                    },
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
            example: "Tender title",
          },
          relevant: {
            type: "string",
            example: "The relevance of tenter",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "NOTICE-CONSENT TO THE COLLECTION, PROCESSING AND USE OF PERSONAL DATA",
                      },
                    },
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
  RequestTendersPost: {
    type: "object",
    properties: {
      ua: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Заголовок тендеру",
          },
          relevant: {
            type: "string",
            example: "Актуальність тентеру",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "ПОВІДОМЛЕННЯ-ЗГОДА НА ЗБІР, ОБРОБКУ ТА ВИКОРИСТАННЯ ПЕРСОНАЛЬНИХ ДАНИХ",
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
        required: ["title", "relevant", "description"],
      },
      en: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Tender title",
          },
          relevant: {
            type: "string",
            example: "The relevance of tenter",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "NOTICE-CONSENT TO THE COLLECTION, PROCESSING AND USE OF PERSONAL DATA",
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
        required: ["title", "relevant", "description"],
      },
      isPosted: {
        type: "boolean",
        example: true,
      },
    },
  },
  RequestLocalizedTender: {
    type: "object",
    properties: {
      title: {
        type: "string",
        example: "Tender title",
      },
      relevant: {
        type: "string",
        example: "The relevance of tenter",
      },
      description: {
        type: "array",
        example: [
          {
            tag: { type: "string", example: "h3" },
            className: {
              type: "string",
              example: "tender-heading-tertiary",
            },
            children: [
              {
                type: "object",
                example: {
                  tag: { type: "string", example: "text" },
                  content: {
                    type: "string",
                    example:
                      "NOTICE-CONSENT TO THE COLLECTION, PROCESSING AND USE OF PERSONAL DATA",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  },
  RequestLocalizedTenderDescr: {
    type: "array",
    example: [
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
          children: [
            {
              tag: { type: "string", example: "text" },
              content: {
                type: "string",
                example:
                  "Lorem ipsum dolor sit amet consectetur. Lacus pellentesque enim integer in magnis enim. Etiam aenean pulvinar non sed at morbi. Tristique interdum nisl risus elementum rhoncus justo. Viverra et risus facilisi dignissim.",
              },
            },
          ],
        },
      },
      {
        type: "object",
        example: {
          tag: { type: "string", example: "p" },
          className: { type: "string", example: "paragraph" },
          children: [
            {
              tag: { type: "string", example: "text" },
              content: {
                type: "string",
                example:
                  "Lorem ipsum dolor sit amet consectetur. Lacus pellentesque enim integer in magnis enim. Etiam aenean pulvinar non sed at morbi. Tristique interdum nisl risus elementum rhoncus justo. Viverra et risus facilisi dignissim.",
              },
            },
          ],
        },
      },
    ],
  },
  ResponseLocalizedTender: {
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
            example: "Tender title",
          },
          relevant: {
            type: "string",
            example: "The relevance of tenter",
          },
          description: {
            type: "array",
            example: [
              {
                tag: { type: "string", example: "h3" },
                className: {
                  type: "string",
                  example: "tender-heading-tertiary",
                },
                children: [
                  {
                    type: "object",
                    example: {
                      tag: { type: "string", example: "text" },
                      content: {
                        type: "string",
                        example:
                          "NOTICE-CONSENT TO THE COLLECTION, PROCESSING AND USE OF PERSONAL DATA",
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
        required: ["title", "relevant", "description"],
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
