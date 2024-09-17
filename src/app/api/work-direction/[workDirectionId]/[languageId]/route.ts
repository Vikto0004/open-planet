import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { languageId: string, workDirectionId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { languageId, workDirectionId } = params;


    if (!workDirectionId || !languageId) throw errorHandler("Bad request", 400);

    const result = await WorkDirectionsModel.findOne({ _id: workDirectionId });


    if (result === null) throw errorHandler("Work direction not found", 404);

    const res = await WorkDirectionsModel.deleteOne({ _id: workDirectionId });

    const updateResult = await HomeModel.updateOne({ _id: languageId }, { $pull: { workDirections: workDirectionId } }, { new: true });



    return NextResponse.json({ res, updateResult });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}