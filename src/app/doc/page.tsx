import SwaggerUI from "swagger-ui-react";

import swagger from "@/swagger/swagger.json";

import "swagger-ui-react/swagger-ui.css";

export default async function IndexPage() {
  return <SwaggerUI spec={swagger} />;
}
