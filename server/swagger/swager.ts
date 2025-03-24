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
        { name: "Projects", description: "Projects apis" },
        { name: "Projects - MainImg", description: "Projects apis" },
        { name: "Projects - Section", description: "Projects apis" },
        { name: "Projects - ImageList", description: "Projects apis" },
        { name: "Projects - BudgetCard", description: "Projects apis" },
        { name: "Policies", description: "Policies apis" },
        { name: "News", description: "News apis" },
        { name: "News - MainImg", description: "News apis" },
        { name: "News - Section", description: "News apis" },
        { name: "News - ImageList", description: "News apis" },
        { name: "Questions", description: "Questions apis" },
        { name: "Contacts", description: "Contacts apis" },
        { name: "Vacancy", description: "Vacancy apis" },
        { name: "Tenders", description: "Tenders apis" },
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
