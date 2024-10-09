import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { NewsModel } from "@/models/news-model";
import { getDataFromToken } from "@/services/tokenServices";
connect();
export async function POST(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const pathName = req.nextUrl.pathname.split("/")[2];

    const getLang = await HomeModel.findOne({ language: pathName });

    if (getLang === null) throw errorHandler("Language not found", 404);

    const res = await NewsModel.create({});

    getLang.news.push(res._id);
    await getLang.save();

    return NextResponse.json({ data: res }, { status: 201 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
