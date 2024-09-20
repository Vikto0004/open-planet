import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";
import { cloudinarySave } from "@/services/cloudinarySave";

import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { NewsModel } from "@/models/news-model";






export async function POST(req: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { newsId } = params;

    if (!newsId) throw errorHandler("Bad request", 400);

    const saveImageResult = await cloudinarySave(req)


    const result = await NewsModel.findByIdAndUpdate({ _id: newsId }, { $set: { "url": saveImageResult.url } }, { new: true });

    if (result === null) throw errorHandler("News not found", 404);

    return NextResponse.json({
      message: "Image saved",
      result
    }, { status: 200 })

  } catch (error: unknown) {
    return handleRoutesError(error);
  }

}

export async function DELETE(req: NextRequest, { params }: { params: { newsId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { newsId } = params;

    const image = await NewsModel.findById({ _id: newsId });

    const deletedImage = await cloudinaryDelete(image)

    if (deletedImage.result !== 'ok') throw errorHandler("Image not found", 404);

    if (deletedImage.result === 'ok') { }

    await NewsModel.findByIdAndUpdate({ _id: newsId }, { $set: { "url": '' } }, { new: true });



    return NextResponse.json({
      message: 'Image deleted'
    }, { status: 200 })
  } catch (error: unknown) {
    return handleRoutesError(error);

  }
}

