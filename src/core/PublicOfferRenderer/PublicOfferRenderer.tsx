import React from "react";
import clsx from "clsx";
import { montserrat } from "../fonts";
import { Node } from "@/query/types/public-offer";

export default function PublicOfferRenderer({ node }: { node: Node }) {
  if (node.tag === "text") {
    return <>{node.text || node.content}</>;
  }

  const Tag = node.tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={clsx(node.className || "", montserrat.className)}>
      {node.children?.map((child, index) => (
        <PublicOfferRenderer key={index} node={child} />
      ))}
    </Tag>
  );
}