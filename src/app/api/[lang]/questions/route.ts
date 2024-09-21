import { NextRequest, NextResponse } from "next/server";


import { HomeModel } from "../../../../../server/models/home-model";

import { getDatafromToken } from "@/services/tokenServices";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { QuestionModel } from "@/models/questions-model";


export async function POST(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);

    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);
    const pathName = req.nextUrl.pathname.split("/")[2];



    const getLang = await HomeModel.findOne({ language: pathName });

    if (getLang === null) throw errorHandler("Language not found", 404);

    const res = await QuestionModel.create({
      "question": "Sample question",
      "answer": "Sample answer",

    });

    getLang.questions.push(res._id);
    await getLang.save();

    return NextResponse.json({ res }, { status: 201 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

