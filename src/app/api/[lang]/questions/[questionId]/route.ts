import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { QuestionModel } from "@/models/questions-model";
import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";




export async function PUT(req: NextRequest, { params }: { params: { questionId: string } }) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Not authorized or not admin", 403);

    const { questionId } = params;

    if (!questionId) throw errorHandler("Bad request", 400);

    const data = await req.json();


    const updateResult = await QuestionModel.findByIdAndUpdate({ "_id": questionId }, {
      $set: {
        ...data
      },
    },
      { new: true });

    if (!updateResult) {
      throw errorHandler("Question not found", 404);
    }

    return NextResponse.json({ updateResult }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}





export async function DELETE(req: NextRequest, { params }: { params: { questionId: string } }) {
  try {

    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Not authorized or not admin", 403);

    const pathName = req.nextUrl.pathname.split("/")[2];

    const { questionId } = params;;

    if (!questionId) throw errorHandler("Bad request", 400);

    const result = await QuestionModel.findOne({ _id: questionId });


    if (result === null) throw errorHandler("Question not found", 404);

    const res = await QuestionModel.deleteOne({ _id: questionId });

    const updateResult = await HomeModel.updateOne({ language: pathName }, { $pull: { questions: questionId } });

    if (!updateResult.acknowledged || !res.acknowledged) {
      throw errorHandler("Question not found", 404);
    }

    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}