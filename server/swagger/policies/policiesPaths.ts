export const policiesPaths = {
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
        put: {
            security: [{ cookieAuth: [] }],
            tags: ["Policies"],
            summary: "Update a policy",
            description: "Send a policy object",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Policy",
                        },
                    },
                },
            },
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
            "responses": {
                "200": {
                    "description": "Policy update success message",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Policy updated successfully"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        post: {
            security: [{ cookieAuth: [] }],
            tags: ["Policies"],
            summary: "Add a block to a policy",
            description: "Send an empty body object",
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
            "responses": {
                "200": {
                    "description": "Success message indicating the block has been added",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Block added successfully"
                                    },
                                    "blockId": {
                                        "type": "string",
                                        "example": "IdExample123"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
    },
    "/api/policy/{policyType}/{blockId}": {
        post: {
            security: [{ cookieAuth: [] }],
            tags: ["Policies"],
            summary: "Add a node inside another node or a block",
            description: "Send an empty body object",
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
                {
                    name: "blockId",
                    in: "path",
                    required: true,
                    description: "Parent Block or Node Id",
                    schema: {
                        type: "string",
                        example: "IdExample123",
                    },
                },
            ],
            "responses": {
                "200": {
                    "description": "Success message indicating the node has been added",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Node added successfully"
                                    },
                                    "nodeId": {
                                        "type": "string",
                                        "example": "IdExample123"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        delete: {
            security: [{ cookieAuth: [] }],
            tags: ["Policies"],
            summary: "Delete a node or block",
            description: "Send an empty body object",
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
                {
                    name: "blockId",
                    in: "path",
                    required: true,
                    description: "Block or Node Id",
                    schema: {
                        type: "string",
                        example: "IdExample123",
                    },
                },
            ],
            "responses": {
                "200": {
                    "description": "Success message indicating the block or node has been removed",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "message": {
                                        "type": "string",
                                        "example": "Block or Node removed successfully"
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    },
};
