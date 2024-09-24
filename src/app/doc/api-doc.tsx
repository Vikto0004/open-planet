"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(spec);
  }, [spec]);

  console.error = (function () {
    const error = console.error;
    return function (exception) {
      if (
        (exception || "")
          .toString()
          .indexOf("UNSAFE_componentWillReceiveProps") === -1
      ) {
        error.apply(console);
      }
    };
  })();

  return <SwaggerUI spec={data} />;
}

export default ReactSwagger;
