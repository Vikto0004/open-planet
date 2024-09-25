import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinarySaveImagesArray } from "@/services/cloudinarySaveImages";
import { getDatafromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const saveImageResult = await cloudinarySaveImagesArray(req);

    const imageData = saveImageResult.map((image) => image.url);

    const result = await WorkDirectionsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      { $push: { images: imageData } },
      { new: true },
    );

    if (result === null) throw errorHandler("Work direction not found", 404);

    return NextResponse.json(
      {
        message: "Image saved",
        result,
      },
      { status: 200 },
    );
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

    const { mainImg } = await WorkDirectionsModel.findById({
      _id: workDirectionId,
    });

    const deletedImage = await cloudinaryDelete(mainImg);

    if (deletedImage.result !== "ok")
      throw errorHandler("Image not found", 404);

    const result = await WorkDirectionsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      { $push: { mainImg: null } },
      { new: true },
    );

    return NextResponse.json(
      {
        message: result,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
