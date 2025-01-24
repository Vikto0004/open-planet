import React from "react";

import { Node } from "@/query/types/public-offer";

export default function Renderer({ node }: { node: Node }) {
  if (node.tag === "text") {
    return <>{node.content}</>;
  }

  const Tag = node.tag as keyof JSX.IntrinsicElements;

  const additionalProps = Tag === "a" && node.href ? { href: node.href } : {};

  return (
    <Tag
      className={node.className || ""}
      style={node.style}
      {...additionalProps}
    >
      {node.children?.map((child, index) => (
        <Renderer key={index} node={child} />
      ))}
    </Tag>
  );
}
