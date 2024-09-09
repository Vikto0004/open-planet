import { getApiDocs } from "@/lib/swagger";

import ReactSwagger from "./api-doc";

export default async function IndexPage() {
  const spec = await getApiDocs();

  return (
    <div className="">
      <section className="container">
        <ReactSwagger spec={spec} />
      </section>
    </div>
  );
}
