import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { QuestionModel } from "@/models/questions-model";
import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { languageId: string, questionId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const { languageId, questionId } = params;;

    if (!questionId || !languageId) throw errorHandler("Bad request", 400);

    const result = await QuestionModel.findOne({ _id: questionId });


    if (result === null) throw errorHandler("Question not found", 404);

    const res = await QuestionModel.deleteOne({ _id: questionId });

    const updateResult = await HomeModel.updateOne({ _id: languageId }, { $pull: { questions: questionId } });



    return NextResponse.json({ res, updateResult });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}