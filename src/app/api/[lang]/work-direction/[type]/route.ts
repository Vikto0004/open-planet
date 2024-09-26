import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { WorkDirectionsModel } from "@/models/workDirections-model";

export async function GET(req: NextRequest) {
  try {
    const pathName = req.nextUrl.pathname.split("/")[2];
    const type = req.nextUrl.pathname.split("/")[4];

    if (!pathName || !type) throw errorHandler("Bad request", 400);

    const workDirections = await WorkDirectionsModel.find({
      language: pathName,
      workDirectionsType: {
        $in: [type],
      },
    })
      .select("_id cardTitle mainImg language createdAt updatedAt")
      .sort({ createDate: 1 });

    if (!workDirections)
      throw errorHandler(
        "Work directions by this language or type is not found",
        404,
      );

    return NextResponse.json({ workDirections });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
