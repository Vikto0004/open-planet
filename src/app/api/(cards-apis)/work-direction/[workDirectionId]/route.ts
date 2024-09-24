import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { getDatafromToken } from "@/services/tokenServices";

export async function PUT(
  req: NextRequest,
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const data = await req.json();

    const updateResult = await WorkDirectionsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      {
        $set: {
          ...data,
        },
      },
      { new: true },
    );

    if (!updateResult) {
      throw errorHandler("Work direction not found", 404);
    }

    return NextResponse.json({ updateResult }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const result = await WorkDirectionsModel.findOne({ _id: workDirectionId });

    if (!result) throw errorHandler("Work direction not found", 404);

    if (result.url) {
      await cloudinaryDelete(result);
    }

    const res = await WorkDirectionsModel.deleteOne({ _id: workDirectionId });

    if (!res.acknowledged) {
      throw errorHandler("Work direction not found", 404);
    }

    return NextResponse.json(
      { message: "Work direction deleted" },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
