import getApiSpec from "@/swagger/swager";

import ReactSwagger from "./api-doc";

export default async function IndexPage() {
  const spac = await getApiSpec();
  return <ReactSwagger spec={spac} />;
}
