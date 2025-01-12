import clsx from "clsx";
import React from "react";

import { Node } from "@/query/types/public-offer";

import { montserrat } from "../fonts";

export default function PublicOfferRenderer({ node }: { node: Node }) {
  if (node.tag === "text") {
    return <>{node.content}</>;
  }

  const Tag = node.tag as keyof JSX.IntrinsicElements;

  const additionalProps = Tag === "a" && node.href ? { href: node.href } : {};

  return (
    <Tag
      className={clsx(node.className || "", montserrat.className)}
      style={node.style}
      {...additionalProps}
    >
      {node.children?.map((child, index) => (
        <PublicOfferRenderer key={index} node={child} />
      ))}
    </Tag>
  );
}
