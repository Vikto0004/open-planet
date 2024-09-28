import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { FaqModel } from "@/models/faq-model";
import { HomeModel } from "@/models/home-model";
import { NewsModel } from "@/models/news-model";

connect();

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);

    await NewsModel.find();
    const faq = await FaqModel.find({ language: language });

    const homeData = await HomeModel.findOne({ language: language })
      .populate({ path: "news" })
      .exec();

    return NextResponse.json({ homeData, faq });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
