import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { PoliciesModel, Node, Block } from "@/models/policies-model";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { blockId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { blockId } = params;
    if (!blockId) throw errorHandler("Block ID is required", 400);

    const newNodeId = String(new mongoose.Types.ObjectId());

    const policy = await PoliciesModel.findOne({
      $or: [
        { "ua.blocks.id": blockId },
        { "en.blocks.id": blockId },
        { "ua.blocks.children.id": blockId },
        { "en.blocks.children.id": blockId },
      ],
    });

    if (!policy) {
      throw errorHandler("Block or Node not found", 404);
    }

    const findTarget = (blocks: Array<Block>): Node | null => {
      for (const block of blocks) {
        if (block.id.toString() === blockId) return block;
        if (block.children) {
          const foundNode = findTarget(block.children);
          if (foundNode) return foundNode;
        }
      }
      return null;
    };
    const targetBlockUa = findTarget(policy.ua.blocks);
    const targetBlockEn = findTarget(policy.en.blocks);

    if (!targetBlockUa && !targetBlockEn) {
      throw errorHandler("Block or Node not found in the structure", 404);
    }

    if (targetBlockUa) {
      if (Array.isArray(targetBlockUa.children)) {
        targetBlockUa.children.push({
          id: newNodeId,
          children: [],
        });
      }
    }

    if (targetBlockEn) {
      if (Array.isArray(targetBlockEn.children)) {
        targetBlockEn.children.push({
          id: newNodeId,
          children: [],
        });
      }
      await policy.save();
    }
    return NextResponse.json(
      {
        message: "Node added successfully",
        nodeId: newNodeId,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
const removeNodeOrBlock = (
  blocks: Array<Block>,
  blockId: string,
): boolean | null => {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].id.toString() === blockId) {
      blocks.splice(i, 1);
      return true;
    }
    if (blocks[i].children) {
      const found = removeNodeOrBlock(blocks[i].children, blockId);
      if (found) return true;
    }
  }
  return false;
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { blockId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { blockId } = params;
    if (!blockId) throw errorHandler("Block ID is required", 400);

    const policy = await PoliciesModel.findOne({
      $or: [
        { "ua.blocks.id": blockId },
        { "en.blocks.id": blockId },
        { "ua.blocks.children.id": blockId },
        { "en.blocks.children.id": blockId },
      ],
    });

    if (!policy) {
      throw errorHandler("Block or Node not found", 404);
    }

    const blockRemovedUa = removeNodeOrBlock(policy.ua.blocks, blockId);
    const blockRemovedEn = removeNodeOrBlock(policy.en.blocks, blockId);

    if (!blockRemovedUa && !blockRemovedEn) {
      throw errorHandler("Block or Node not found in the structure", 404);
    }

    await policy.save();

    return NextResponse.json(
      {
        message: "Block or Node removed successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
