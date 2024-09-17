import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { QuestionModel } from "@/models/questions-model";
import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: { params: { questionId: string } }) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

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