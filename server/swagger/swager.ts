import { createSwaggerSpec } from "next-swagger-doc";

import { components } from "./components";
import { paths } from "./paths";
import { securitySchemes } from "./security";

const getApiSpec = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "Next.js API Documentation",
      },
      tags: [
        {
          name: "Auth",
          description: "Authorization and user endpoints",
        },
        { name: "Home", description: "Home page" },
        { name: "Home - News", description: "Home page" },
        { name: "Home - Work direction", description: "Home page" },
        { name: "Home - Questions", description: "Home page" },
      ],
      paths: { ...paths },
      components: { schemas: { ...components } },
      securitySchemes: { ...securitySchemes },
      security: [{ cookieAuth: [] }],
    },
  });
  return spec;
};

export default getApiSpec;
