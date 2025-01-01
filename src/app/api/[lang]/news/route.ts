import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import getPagination from "@/helpers/getPagination";
import { NewsModel } from "@/models/news-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);
    const userData = getDataFromToken(req);

    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";
    const { page, limit } = await getPagination(req);

    if (!language) throw errorHandler("Bad request", 400);

    const queryCondition = {
      isPosted: isAdmin ? { $in: [true, false] } : { $in: [true] }
    };
    const totalNews =
      await NewsModel.countDocuments(queryCondition);
    const News = await NewsModel.find(queryCondition)
      .select(`${language} createdAt updatedAt`)
      .sort({ createdAt: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!News || News.length === 0)
      throw errorHandler("News by this language is not found", 404);

    return NextResponse.json({
      News,
      totalNews,
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
