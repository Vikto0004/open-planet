import { NextRequest, NextResponse } from "next/server";


import { HomeModel } from "../../../../server/models/home-model";

import { getDatafromToken } from "@/services/tokenServices";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { NewsModel } from "@/models/news-model";


export async function POST(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const reqBody = await req.json();

    const getLang = await HomeModel.findOne({ _id: reqBody.languageId });

    if (getLang === null) throw errorHandler("Language not found", 404);

    const res = await NewsModel.create(reqBody);

    getLang.news.push(res._id);
    await getLang.save();

    return NextResponse.json({ res, }, { status: 201 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

// export async function DELETE(req: NextRequest) {
//   try {

//     const userData = getDatafromToken(req);
//     if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

//     const { languageId, newsId } = await req.json();

//     if (!newsId || !languageId) throw errorHandler("Bad request", 400);

//     const result = await NewsModel.findOne({ _id: newsId });


//     if (result === null) throw errorHandler("News not found", 404);

//     const res = await NewsModel.deleteOne({ _id: newsId });

//     const updateResult = await HomeModel.updateOne({ _id: languageId }, { $pull: { news: newsId } });



//     return NextResponse.json({ res, updateResult });
//   } catch (error: unknown) {
//     return handleRoutesError(error);
//   }
// }