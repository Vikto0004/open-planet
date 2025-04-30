import { createPolicyBlock } from "@/admin-shared/api";
import {
  IPolicyBlock,
  polycyType,
  TagsClasses,
} from "@/admin-shared/model/interfaces/workDirectionInterfaces";

export const createNewChildNodeBlock = async (
  parentId: string | null,
  tagName: string,
  content: string,
  blocks: IPolicyBlock[],
  type: polycyType,
  selectedMainBlockId: string | null,
): Promise<IPolicyBlock[]> => {
  if (!parentId) {
    return [];
  }
  const blockId = await createPolicySection(parentId, type);
  const childrenId = await createPolicySection(blockId, type);

  const newChild: IPolicyBlock = {
    id: blockId,
    tag: tagName,
    className: TagsClasses[tagName as keyof typeof TagsClasses],
    children: [{ id: childrenId, tag: "text", content }],
  };

  if (tagName === "ul" || tagName === "ol") {
    const textInsideLiId = await createPolicySection(childrenId, type);

    const className =
      tagName === "ul" ? TagsClasses["linkUN"] : TagsClasses["linkN"];

    newChild.children = [
      {
        id: childrenId,
        tag: "li",
        className,
        children: [{ id: textInsideLiId, tag: "text", content }],
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
    if (!blockList.length && tagName !== "li") return [newChild];
    if (parentId === selectedMainBlockId && tagName !== "li")
      return [...blockList, newChild];
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

      return {
        ...block,
        children: block.children ? addChild(block.children) : block.children,
      };
    });
  };

  return addChild(blocks);
};

export const createPolicySection = async (
  parentId: string,
  type: polycyType,
): Promise<string> => {
  try {
    const response = await createPolicyBlock({
      blockId: parentId,
      type,
    });

    const id = response.blockId || response.nodeId;

    if (!id) {
      throw new Error("Сервер не повернув ID блоку.");
    }

    return id;
  } catch (error) {
    console.error("❌ Помилка при додаванні нового блоку:", error);
    throw error;
  }
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

export const findParentId = (
  childId: string,
  blocks: IPolicyBlock[],
): string | null => {
  for (const block of blocks) {
    if (block.children?.some((child) => child.id === childId)) {
      return block.id;
    }
    if (block.children) {
      const result = findParentId(childId, block.children);
      if (result) return result;
    }
  }
  return null;
};
