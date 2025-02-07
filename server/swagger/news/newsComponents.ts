export const newsComponents = {
    ResponseNews: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                example: "64d8c23eabf9123456789012",
            },
            ua: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        example: "Заголовок новини українською",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
                                content: "Заголовок новини",
                            },
                            {
                                id: "64d8c23eabf9123456789013",
                                sectionType: "paragraph",
                                content: ["Опис новини українською мовою", "Опис новини українською мовою", "Опис новини українською мовою"],
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
                        example: "News Title in English",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
                                content: "News Title",
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
    ResponseNewsPost: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                example: "64d8c23eabf9123456789012",
            },
            ua: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        example: "Заголовок новини українською",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
                        example: "News Title in English",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
    RequestNews: {
        type: "object",
        properties: {
            ua: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        example: "Заголовок новини українською",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
                                content: "Заголовок новини",
                            },
                            {
                                id: "64d8c23eabf9123456789013",
                                sectionType: "paragraph",
                                content: ["Опис новини українською мовою", "Опис новини українською мовою", "Опис новини українською мовою"],
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
                        example: "News Title in English",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
                                content: "News Title",
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
        },
    },
    RequestNewsPost: {
        type: "object",
        properties: {
            ua: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        example: "Заголовок новини українською",
                    },
                },
                required: ["cardTitle"],
            },
            en: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        example: "News Title in English",
                    },
                },
                required: ["cardTitle"],
            },
        },
    },
    RequestLocalizedNews: {
        type: "object",
        properties: {
            cardTitle: {
                type: "string",
                example: "News Title",
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
                            enum: ["paragraph", "title", "subtitle", "imageList"],
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
    ResponseLocalizedNews: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                example: "64d8c23eabf9123456789012",
            },
            en: {
                type: "object",
                properties: {
                    cardTitle: {
                        type: "string",
                        example: "News Title",
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
                                    enum: ["paragraph", "title", "subtitle", "imageList"],
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
