import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

import { HomeModel } from "@/models/home-model";
import { getDatafromToken } from "@/services/tokenServices";

import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { errorHandler } from "@/errors/errorHandler";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { NewsModel } from "@/models/news-model";
import { QuestionModel } from "@/models/questions-model";


connect();

export async function GET(req: NextRequest) {
  try {
    const pathName = req.nextUrl.pathname.split("/")[2];

    await WorkDirectionsModel.find();
    await NewsModel.find();
    await QuestionModel.find();

    const homeData = await HomeModel.findOne({ language: pathName }).populate({ path: "workDirections", select: "header description url" }).populate({ path: "questions", select: "header description url" }).populate({ path: "news" });

    return NextResponse.json({ homeData });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);
    const reqBody = await req.json();

    const res = await HomeModel.create(reqBody);

    return NextResponse.json({ res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}