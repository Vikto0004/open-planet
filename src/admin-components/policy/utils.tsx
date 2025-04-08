import {
  IPolicyBlock,
  TagsClasses,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const createNewChildNodeBlock = (
  parentId: string | null,
  tagName: string,
  content: string,
  blocks: IPolicyBlock[],
) => {
  const newChild: IPolicyBlock = {
    id: createPolicyBlock(),
    tag: tagName,
    className: TagsClasses[tagName as keyof typeof TagsClasses],
    children: [{ id: createPolicyBlock(), tag: "text", content }],
  };

  //create child
  if (tagName === "ul" || tagName === "ol") {
    const className =
      tagName === "ul" ? TagsClasses["linkUN"] : TagsClasses["linkN"];
    newChild.children = [
      {
        id: createPolicyBlock(),
        tag: "li",
        className,
        children: [{ id: createPolicyBlock(), tag: "text", content }],
      },
    ];
  }

  if (tagName === "li") {
    const parentBlock = blocks.find((block) => block.id === parentId);
    if (parentBlock && (parentBlock.tag === "ul" || parentBlock.tag === "ol")) {
      const className =
        parentBlock.tag === "ul" ? TagsClasses["linkUN"] : TagsClasses["linkN"];
      newChild.className = className;
    }
  }

  const addChild = (blockList: IPolicyBlock[]): IPolicyBlock[] => {
    if (!blockList.length && tagName !== "li") {
      return [newChild];
    }

    if (!parentId && tagName !== "li") {
      return [...blockList, newChild]; // Додаємо newChild до верхнього рівня
    }

    return blockList.map((block) => {
      if (block.id === parentId) {
        if (block.tag === "ul" || block.tag === "ol") {
          return { ...block, children: [...(block.children || []), newChild] };
        } else if (block.tag === "li") {
          return {
            ...block,
            children: block.children ? addChild(block.children) : [newChild],
          };
        }
      }
      // } else {
      //   console.log("7");
      //   return {
      //     ...block,
      //     children: block.children ? [...block.children, newChild] : [newChild],
      //   };
      // }

      return {
        ...block,
        children: block.children ? addChild(block.children) : block.children,
      };
    });
  };

  const updatedBlocks = addChild(blocks);
  return updatedBlocks;
};

export const createPolicySection = () => {
  const id = Date.now().toString();
  return id;
};

export const createPolicyBlock = () => {
  const id = Math.random().toString(36).substr(2, 9);
  return id;
};

export const removeBlockById = (
  id: string,
  blocks: IPolicyBlock[],
): IPolicyBlock[] => {
  return blocks
    .filter((block) => block.id !== id)
    .map((block) => ({
      ...block,
      children: block.children
        ? removeBlockById(id, block.children)
        : undefined,
    }));
};

export const findPathToBlock = (
  id: string,
  blocks: IPolicyBlock[],
  parentPath: string,
): string | null => {
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const currentPath = `${parentPath}[${index}]`;

    if (block.id === id) {
      return `${currentPath}`;
    }

    if (block.children) {
      const result = findPathToBlock(
        id,
        block.children,
        `${currentPath}.children`,
      );
      if (result) return result;
    }
  }

  return null;
};

export const mergeAdjacentTextBlocks = (
  blocks: IPolicyBlock[],
): IPolicyBlock[] => {
  const merged: IPolicyBlock[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    const prev = merged[merged.length - 1];

    if (current.tag === "text" && prev && prev.tag === "text") {
      // Зліплюємо текст
      prev.content = (prev.content || "") + (current.content || "");
    } else {
      merged.push({ ...current });
    }
  }

  return merged;
};
