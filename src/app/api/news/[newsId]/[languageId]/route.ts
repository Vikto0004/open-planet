import { NextRequest, NextResponse } from "next/server";


import { getDatafromToken } from "@/services/tokenServices";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { NewsModel } from "@/models/news-model";
import { HomeModel } from "@/models/home-model";

export async function DELETE(req: NextRequest, { params }: { params: { languageId: string, newsId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { languageId, newsId } = params;;

    if (!newsId || !languageId) throw errorHandler("Bad request", 400);

    const result = await NewsModel.findOne({ _id: newsId });


    if (result === null) throw errorHandler("News not found", 404);

    const res = await NewsModel.deleteOne({ _id: newsId });

    const updateResult = await HomeModel.updateOne({ _id: languageId }, { $pull: { news: newsId } });



    return NextResponse.json({ res, updateResult });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}