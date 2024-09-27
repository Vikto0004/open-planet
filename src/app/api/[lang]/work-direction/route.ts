import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import getSearchParams from "@/helpers/getSearchParams";
import { WorkDirectionsModel } from "@/models/workDirections-model";

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);
    const type = await getSearchParams(req, "type");

    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");

    if (!page || !limit)
      throw errorHandler("Bad request add page and limit", 400);

    if (!language) throw errorHandler("Bad request", 400);

    const workDirections = await WorkDirectionsModel.find({
      language: language,
      ...(type && { workDirectionsType: { $in: [type] } }),
    })
      .select("_id cardTitle mainImg language createdAt updatedAt")
      .sort({ createDate: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalWorkDirections = await WorkDirectionsModel.countDocuments({
      language: language,

      ...(type && { workDirectionsType: { $in: [type] } }),
    });

    if (!workDirections)
      throw errorHandler("Work directions by this language is not found", 404);

    return NextResponse.json({
      workDirections,
      totalWorkDirections,
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
