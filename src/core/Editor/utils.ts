interface NodeObject {
  tag: string;
  className?: string;
  children: (NodeObject | TextNode)[];
  href?: string;
}

interface TextNode {
  tag: "text";
  content: string;
}

export function parseEditableContent(element: HTMLElement): NodeObject[] {
  const nodes = Array.from(element.children);

  if (!nodes.length) {
    const obj: NodeObject = {
      tag: element.tagName.toLowerCase(),
      className: element.className || "",
      children: [],
    };

    if (element instanceof HTMLAnchorElement) {
      obj.href = element.href;
      obj.children.push({
        tag: "text",
        content: element.textContent || "",
      });
    }
    return [obj];
  }

  return nodes.map((node) => {
    const obj: NodeObject = {
      tag: node.tagName.toLowerCase(),
      className: node.className || "",
      children: [],
    };

    if (node.childNodes.length > 0) {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const textNode: TextNode = {
            tag: "text",
            content: child.nodeValue?.trim() || "",
          };
          if (textNode.content) {
            obj.children.push(textNode);
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const childElement = child as HTMLElement;
          const parsedChild = parseEditableContent(childElement);
          obj.children.push(...parsedChild);
        }
      });
    }

    return obj;
  });
}
