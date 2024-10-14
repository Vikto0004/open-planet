export const textSectionPath = {
  "/api/textSection/{textSectionId}": {
    put: {
      tags: ["Text section"],
      summary: "Update text section",
      description: "Update text section",
      security: [{ cookieAuth: [] }],
      parameters: [
        {
          name: "textSectionId",
          in: "path",
          required: true,
          description: "Text section ID",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        description: "Update text section",
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RequestUpdateTextSection",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Text section updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResponseTextSection",
              },
            },
          },
        },
      },
    },
  },
};
