import { NextRequest, NextResponse } from "next/server";


import { HomeModel } from "../../../../server/models/home-model";

import { getDatafromToken } from "@/services/tokenServices";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { QuestionModel } from "@/models/questions-model";


export async function POST(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const reqBody = await req.json();

    const getLang = await HomeModel.findOne({ _id: reqBody.languageId });

    if (getLang === null) throw errorHandler("Language not found", 404);

    const res = await QuestionModel.create(reqBody);

    getLang.questions.push(res._id);
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

//     const { languageId, questionId } = await req.json();

//     if (!questionId || !languageId) throw errorHandler("Bad request", 400);

//     const result = await QuestionModel.findOne({ _id: questionId });


//     if (result === null) throw errorHandler("Question not found", 404);

//     const res = await QuestionModel.deleteOne({ _id: questionId });

//     const updateResult = await HomeModel.updateOne({ _id: languageId }, { $pull: { questions: questionId } });



//     return NextResponse.json({ res, updateResult });
//   } catch (error: unknown) {
//     return handleRoutesError(error);
//   }
// }