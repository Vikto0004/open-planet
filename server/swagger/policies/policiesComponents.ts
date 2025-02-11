export const policiesComponents = {
    "Node": {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The ID of the node.",
                "example": "node123"
            },
            "tag": {
                "type": "string",
                "description": "The HTML tag for the node.",
                "example": "div"
            },
            "className": {
                "type": "string",
                "description": "The CSS class for the node.",
                "example": "policy-node"
            },
            "style": {
                "type": "object",
                "additionalProperties": {
                    "type": "string"
                },
                "description": "The style of the node as a key-value pair.",
                "example": {
                    "color": "blue",
                    "font-size": "14px"
                }
            },
            "href": {
                "type": "string",
                "description": "The hyperlink associated with the node.",
                "example": "https://example.com"
            },
            "content": {
                "type": "string",
                "description": "The content inside the node.",
                "example": "This is some content"
            },
            "children": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/Node"
                },
                "description": "Nested child nodes.",
                "example": [
                    {
                        "id": "child1",
                        "tag": "p",
                        "className": "child-class",
                        "content": "Child node content"
                    }
                ]
            }
        }
    },
    "PolicyBlock": {
        "type": "object",
        "properties": {
            "id": {
                "type": "string",
                "description": "The ID of the policy block.",
                "example": "block123"
            },
            "tag": {
                "type": "string",
                "description": "The HTML tag for the block.",
                "example": "section"
            },
            "className": {
                "type": "string",
                "description": "The CSS class for the block.",
                "example": "policy-block"
            },
            "children": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/Node"
                },
                "description": "The child nodes inside the policy block.",
                "example": [
                    {
                        "id": "child1",
                        "tag": "p",
                        "className": "child-class",
                        "content": "Child block content"
                    }
                ]
            }
        }
    },
    "PolicyLocalization": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": "The title of the policy localization.",
                "example": "Privacy Policy"
            },
            "subtitle": {
                "type": "string",
                "description": "The subtitle of the policy localization.",
                "example": "Your data protection rights"
            },
            "blocks": {
                "type": "array",
                "items": {
                    "$ref": "#/components/schemas/PolicyBlock"
                },
                "description": "A list of blocks in the policy localization.",
                "example": [
                    {
                        "id": "block1",
                        "tag": "section",
                        "className": "policy-block",
                        "children": [
                            {
                                "id": "child1",
                                "tag": "p",
                                "content": "This is the first block content"
                            }
                        ]
                    }
                ]
            }
        }
    },
    "Policy": {
        "type": "object",
        "properties": {
            "type": {
                "type": "string",
                "enum": ["privacyPolicy", "publicOffer"],
                "description": "The type of the policy (either privacyPolicy or publicOffer).",
                "example": "privacyPolicy"
            },
            "ua": {
                "description": "The Ukrainian localization of the policy.",
                "example": {
                    "title": "Політика конфіденційності",
                    "subtitle": "Ваші права на захист даних",
                    "blocks": [
                        {
                            "id": "block1",
                            "tag": "section",
                            "className": "policy-block",
                            "children": [
                                {
                                    "id": "child1",
                                    "tag": "p",
                                    "content": "Це вміст першого блоку"
                                }
                            ]
                        }
                    ]
                }
            },
            "en": {
                "description": "The English localization of the policy.",
                "example": {
                    "title": "Privacy Policy",
                    "subtitle": "Your data protection rights",
                    "blocks": [
                        {
                            "id": "block1",
                            "tag": "section",
                            "className": "policy-block",
                            "children": [
                                {
                                    "id": "child1",
                                    "tag": "p",
                                    "content": "This is the first block content"
                                }
                            ]
                        }
                    ]
                }
            }
        }
    },
}
