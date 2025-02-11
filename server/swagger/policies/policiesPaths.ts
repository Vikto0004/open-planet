export const policiesPaths = {
    "/api/policy/{policyType}": {
        get: {
            security: [{ cookieAuth: [] }],
            tags: ["Policies"],
            summary: "Get a policy",
            description: "Send an empty request body",
            parameters: [
                {
                    name: "policyType",
                    in: "path",
                    required: true,
                    description: "Policy Type",
                    schema: {
                        type: "string",
                        enum: ["privacyPolicy", "publicOffer"],
                        example: "privacyPolicy",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Policy object",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    response: {
                                        $ref: "#/components/schemas/Policy",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        put: {},
        post: {}
    },
    "/api/{lang}/policy/{policyType}": {
        get: {
            security: [{ cookieAuth: [] }],
            tags: ["Policies"],
            summary: "Get a policy by lang",
            description: "Send an empty request body",
            parameters: [
                {
                    name: "lang",
                    in: "path",
                    required: true,
                    description: "Language",
                    schema: {
                        type: "string",
                        enum: ["ua", "en"],
                        example: "ua",
                    },
                },
                {
                    name: "policyType",
                    in: "path",
                    required: true,
                    description: "Policy Type",
                    schema: {
                        type: "string",
                        enum: ["privacyPolicy", "publicOffer"],
                        example: "privacyPolicy",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Policy object",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    response: {
                                        $ref: "#/components/schemas/PolicyLocalization",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    "/api/{lang}/policy/{policyType}/{blockId}": {
        post: {},
        delete: {}
    },
};
