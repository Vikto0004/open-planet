import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { WorkDirectionsModel } from "@/models/workDirections-model";

export async function GET(req: NextRequest) {
  try {
    const language = req.nextUrl.pathname.split("/")[2];

    if (!language) throw errorHandler("Bad request", 400);

    const workDirections = await WorkDirectionsModel.find({
      language: language,
    })
      .select("_id cardTitle mainImg language createdAt updatedAt")
      .sort({ createDate: 1 });

    if (!workDirections)
      throw errorHandler("Work directions by this language is not found", 404);

    return NextResponse.json({ workDirections });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
