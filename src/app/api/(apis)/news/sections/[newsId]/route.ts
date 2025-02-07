import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { NewsModel, sectionJoiSchema } from "@/models/news-model";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { newsId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { newsId } = params;

    if (!newsId) throw errorHandler("Bad request", 400);

    const request = await req.json();
    const type = request.type;
    if (!type) throw errorHandler("Section type is required", 400);

    const sectionId = new mongoose.Types.ObjectId().toString();
    const { value, error } = await sectionJoiSchema.validate(
      {
        sectionType: type,
      },
      { abortEarly: false },
    );

    if (error) {
      return NextResponse.json(
        {
          message: "Validation error",
          error: error.details,
        },
        { status: 400 },
      );
    }

    const newSection = {
      id: sectionId,
      sectionType: value.sectionType,
      content: value.content,
    };

    const news = await NewsModel.findById(newsId);
    if (!news) throw errorHandler("News not found", 404);

    const uaPath = "ua.sections";
    const enPath = "en.sections";

    const result = await NewsModel.findByIdAndUpdate(
      { _id: newsId },
      {
        $push: {
          [uaPath]: newSection,
          [enPath]: newSection,
        },
      },
      { new: true },
    );

    if (result === null) throw errorHandler("News not found", 404);

    return NextResponse.json(
      {
        message: "Section saved",
        result,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
