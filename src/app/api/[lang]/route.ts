import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import getLanguage from "@/helpers/getLanguage";
import { HomeModel } from "@/models/home-model";
import { NewsModel } from "@/models/news-model";

connect();

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);

    await NewsModel.find();

    const homeData = await HomeModel.findOne({ language: language })
      .populate({ path: "news" })
      .exec();

    return NextResponse.json({ homeData });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
