export const newsPaths = {
    "/api/news": {
        post: {
            security: [{ cookieAuth: [] }],
            tags: ["News"],
            summary: "Create a news",
            description: "Send a request body",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/RequestNewsPost",
                        },
                    },
                },
            },
            responses: {
                "201": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNewsPost",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
            },
        },
    },
    "/api/{lang}/news": {
        get: {
            security: [{ cookieAuth: [] }],
            tags: ["News"],
            summary: "Get a news cards by lang",
            description: "Send an empty request body",
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
                {
                    name: "page",
                    in: "query",
                    required: true,
                    description: "Page number for pagination",
                    schema: {
                        type: "integer",
                        example: 1,
                    },
                },
                {
                    name: "limit",
                    in: "query",
                    required: true,
                    description: "Number of items per page",
                    schema: {
                        type: "integer",
                        example: 10,
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Array ofobjects with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/ResponseLocalizedNews", }
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "/api/{lang}/news/{id}": {
        get: {
            security: [{ cookieAuth: [] }],
            tags: ["News"],
            summary: "Get a news card by lang",
            description: "Send an empty request body",
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
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseLocalizedNews",
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
            tags: ["News"],
            summary: "Update a news card by lang",
            description: "Send a request body",
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
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "News ID",
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
                            $ref: "#/components/schemas/RequestLocalizedNews",
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "News updated",
                                    },
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseLocalizedNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
                "400": {
                    description: "Bad request",
                },
            },
        },
    },
    "/api/news/{id}": {
        get: {
            security: [{ cookieAuth: [] }],
            tags: ["News"],
            summary: "Get a news card",
            description: "Send an empty request body",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
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
            tags: ["News"],
            summary: "Update a news card",
            description: "Send a request body",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "News ID",
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
                            $ref: "#/components/schemas/RequestNews",
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "News updated",
                                    },
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
                "400": {
                    description: "Bad request",
                },
            },
        },
        delete: {
            security: [{ cookieAuth: [] }],
            tags: ["News"],
            summary: "Delete a news card",
            description: "Send an empty request body",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Object with response",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    message: {
                                        type: "string",
                                        example: "News deleted",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
            },
        },
    },
    "/api/news/img/{newsId}": {
        post: {
            security: [{ cookieAuth: [] }],
            tags: ["News - MainImg"],
            summary: "Upload a news card main image",
            description: "Add image to the news card",
            parameters: [
                {
                    name: "newsId",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                file: {
                                    type: "string",
                                    format: "binary",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
            },
        },
        delete: {
            security: [{ cookieAuth: [] }],
            tags: ["News - MainImg"],
            summary: "Delete a news card main image",
            description: "Send an empty body",
            parameters: [
                {
                    name: "newsId",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNewsPost",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
            },
        },
    },
    "/api/news/images/{newsId}/{sectionId}": {
        post: {
            security: [{ cookieAuth: [] }],
            tags: ["News - ImageList"],
            summary: "Upload a news card images",
            description: "Add images to the news card",
            parameters: [
                {
                    name: "newsId",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "sectionId",
                    in: "path",
                    required: true,
                    description: "Section ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                files: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        format: "binary",
                                    },
                                },
                            },
                            required: ["files"],
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
            },
        },
        delete: {
            security: [{ cookieAuth: [] }],
            tags: ["News - ImageList"],
            summary: "Delete a news card image",
            description: "Add an image link",
            parameters: [
                {
                    name: "newsId",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "sectionId",
                    in: "path",
                    required: true,
                    description: "Section ID",
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
                            type: "object",
                            properties: {
                                imageUrl: {
                                    type: "string",
                                    format: "uri",
                                    example: "https://example.com/image.jpg",
                                },
                            },
                            required: ["imageUrl"],
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Object with news content",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "Not found",
                },
            },
        },
    },
    "/api/news/sections/{newsId}": {
        post: {
            security: [{ cookieAuth: [] }],
            tags: ["News - Section"],
            summary: "Add a section",
            description: "Add a type of section",
            parameters: [
                {
                    name: "newsId",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: [
                                        "title",
                                        "subtitle",
                                        "paragraph",
                                        "imageList"
                                    ],
                                },
                            },
                            required: ["type"],
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Section saved",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "404": {
                    description: "News not found",
                },
            },
        },
    },
    "/api/news/sections/{newsId}/{sectionId}": {
        delete: {
            security: [{ cookieAuth: [] }],
            tags: ["News - Section"],
            summary: "Delete a section",
            description: "Add an empty body",
            parameters: [
                {
                    name: "newsId",
                    in: "path",
                    required: true,
                    description: "News ID",
                    schema: {
                        type: "string",
                    },
                },
                {
                    name: "sectionId",
                    in: "path",
                    required: true,
                    description: "Section ID",
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Section is deleted",
                    content: {
                        "application/json": {
                            schema: {
                                properties: {
                                    response: {
                                        type: "object",
                                        $ref: "#/components/schemas/ResponseNews",
                                    },
                                },
                            },
                        },
                    },
                },
                "500": {
                    description: "Failed to delete section",
                },
            },
        },
    },
};
