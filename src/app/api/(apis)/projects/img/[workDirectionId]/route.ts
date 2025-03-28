import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { ProjectsModel } from "@/models/projects-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinarySave } from "@/services/cloudinarySave";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const saveImageResult = await cloudinarySave(req);

    const result = await ProjectsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      {
        $set: {
          "ua.mainImg": saveImageResult.url,
          "en.mainImg": saveImageResult.url,
        },
      },
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
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    const { ua, en } = await ProjectsModel.findById({
      _id: workDirectionId,
    });

    const mainImg = ua.mainImg || en.mainImg;

    const deletedImage = await cloudinaryDelete(mainImg);

    if (deletedImage.result !== "ok")
      throw errorHandler("Image not found", 404);

    const result = await ProjectsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      {
        $set: {
          "ua.mainImg": "",
          "en.mainImg": "",
        },
      },
      { new: true },
    );

    return NextResponse.json(
      {
        message: "Successfully deleted",
        result,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
