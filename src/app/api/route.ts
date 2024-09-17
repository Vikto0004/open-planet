import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

import { HomeModel } from "@/models/home-model";
import { getDatafromToken } from "@/services/tokenServices";

import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { errorHandler } from "@/errors/errorHandler";

import { QuestionModel } from "@/models/questions-model";
import { WorkDirectionsModel } from "@/models/workDirections-model";
import { NewsModel } from "@/models/news-model";



connect();

export async function GET() {
  try {
    const questions = QuestionModel.modelName;
    const workDirections = WorkDirectionsModel.modelName;
    const news = NewsModel.modelName;

    if (!questions || !workDirections || !news) throw errorHandler("Forbidden", 403);

    const homeData = await HomeModel.find().populate({ path: "workDirections" }).populate({ path: "questions" }).populate({ path: "news" });




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