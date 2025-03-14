import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { ProjectsModel, sectionJoiSchema } from "@/models/projects-model";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const request = await req.json();
    const type = request.type;
    if (!type) throw errorHandler("Section type is required", 400);

    const sectionId = new mongoose.Types.ObjectId().toString();
    const budgetCardId = new mongoose.Types.ObjectId().toString();

    const budgetCard = [
      {
        id: budgetCardId,
        title: "",
        amount: "",
      },
    ];

    const { value, error } = await sectionJoiSchema.validate(
      {
        sectionType: type,
        ...(type === "budgetCards" && { content: budgetCard }),
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

    const workDirection = await ProjectsModel.findById(workDirectionId);
    if (!workDirection) throw errorHandler("Work direction not found", 404);

    const uaPath = "ua.sections";
    const enPath = "en.sections";

    const result = await ProjectsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      {
        $push: {
          [uaPath]: newSection,
          [enPath]: newSection,
        },
      },
      { new: true },
    );

    if (result === null) throw errorHandler("Project not found", 404);

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
