import { getApiDocs } from "@/lib/swagger";

import ReactSwagger from "./api-doc";

export default async function IndexPage() {
  const spec = await getApiDocs();
  console.log(spec);

  return (
    <div className="pt-6">
      <section className="container">
        <ReactSwagger spec={spec} url="/swagger.json" />
      </section>
    </div>
  );
}
