import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { NewsModel } from "@/models/news-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";

import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { newsId } = params;

    if (!newsId) throw errorHandler("Bad request", 400);

    const data = await req.json();


    const updateResult = await NewsModel.findByIdAndUpdate({ "_id": newsId }, {
      $set: {
        ...data
      },
    },
      { new: true });

    if (!updateResult) {
      throw errorHandler("News not found", 404);
    }

    return NextResponse.json({ updateResult }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}





export async function DELETE(req: NextRequest, { params }: { params: { newsId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { newsId } = params;

    const pathName = req.nextUrl.pathname.split("/")[2];

    if (!newsId) throw errorHandler("Bad request", 400);

    const result = await NewsModel.findOne({ _id: newsId });

    if (result === null) throw errorHandler("News not found", 404);

    const deletedImage = await cloudinaryDelete(result)



    const res = await NewsModel.deleteOne({ _id: newsId });

    const updateResult = await HomeModel.updateOne({ language: pathName }, { $pull: { news: newsId } }, { new: true });


    if (!updateResult.acknowledged || !res.acknowledged || deletedImage.result !== "ok") {
      throw errorHandler("News not found", 404);
    }

    return NextResponse.json({ message: "News deleted" }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}