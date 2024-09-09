"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  const [data, setdata] = useState({});
  useEffect(() => {
    setdata(spec);
  }, [spec]);

  return <SwaggerUI spec={data} />;
}

export default ReactSwagger;
