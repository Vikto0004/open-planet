import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";
import { cloudinarySave } from "@/services/cloudinarySave";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";






export async function POST(req: NextRequest, { params }: { params: { workDirectionId: string } }) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const saveImageResult = await cloudinarySave(req)


    const result = await WorkDirectionsModel.findByIdAndUpdate({ _id: workDirectionId }, { $set: { "url": saveImageResult.url } }, { new: true });

    if (result === null) throw errorHandler("Work direction not found", 404);

    return NextResponse.json({
      img: result
    }, { status: 200 })

  } catch (error: unknown) {
    return handleRoutesError(error);
  }

}

export async function DELETE(req: NextRequest, { params }: { params: { workDirectionId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { workDirectionId } = params;

    const image = await WorkDirectionsModel.findById({ _id: workDirectionId });

    const deletedImage = await cloudinaryDelete(image)

    if (deletedImage.result !== 'ok') throw errorHandler("Image not found", 404);

    if (deletedImage.result === 'ok') { }

    const result = await WorkDirectionsModel.findByIdAndUpdate({ _id: workDirectionId }, { $set: { "url": '' } }, { new: true });




    return NextResponse.json({
      message: result
    }, { status: 200 })
  } catch (error: unknown) {
    return handleRoutesError(error);

  }
}

