import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { isUserExist } from "@/errors/isUserExist";
import { NewsModel } from "@/models/news-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinarySave } from "@/services/cloudinarySave";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { newsId: string } },
) {
  try {
    await isUserExist(req);
    const { newsId } = params;

    if (!newsId) throw errorHandler("Bad request", 400);

    const saveImageResult = await cloudinarySave(req);

    const result = await NewsModel.findByIdAndUpdate(
      { _id: newsId },
      { $set: { url: saveImageResult.url } },
      { new: true },
    );

    if (result === null) throw errorHandler("News not found", 404);

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
  { params }: { params: { newsId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { newsId } = params;

    const image = await NewsModel.findById({ _id: newsId });

    const deletedImage = await cloudinaryDelete(image);

    if (deletedImage.result !== "ok")
      throw errorHandler("Image not found", 404);

    await NewsModel.findByIdAndUpdate(
      { _id: newsId },
      { $set: { url: null } },
      { new: true },
    );

    return NextResponse.json(
      {
        message: "Image deleted",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
