import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

import { HomeModel } from "@/models/home-model";
import { getDatafromToken } from "@/services/tokenServices";

import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { errorHandler } from "@/errors/errorHandler";
import { NewsModel } from "@/models/news-model";



connect();

export async function GET(req: NextRequest) {
  try {
    const pathName = req.nextUrl.pathname.split("/")[2];

    await NewsModel.find();


    const homeData = await HomeModel.findOne({ language: pathName }).populate({ path: "news" }).exec();

    return NextResponse.json({ homeData });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}

