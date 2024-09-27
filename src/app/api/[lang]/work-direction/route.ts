import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import getPagination from "@/helpers/getPagination";
import getSearchParams from "@/helpers/getSearchParams";
import { WorkDirectionsModel } from "@/models/workDirections-model";

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);
    const type = await getSearchParams(req, "type");

    const { page, limit } = await getPagination(req);

    if (
      type &&
      !["medecine", "electric", "education", "restoration", "culture"].includes(
        type,
      )
    )
      throw errorHandler("Bad request wrong type", 400);

    if (!language) throw errorHandler("Bad request", 400);

    const totalWorkDirections = await WorkDirectionsModel.countDocuments({
      language: language,
      ...(type && { workDirectionsType: { $in: [type] } }),
    });

    const workDirections = await WorkDirectionsModel.find({
      language: language,
      ...(type && { workDirectionsType: { $in: [type] } }),
    })
      .select("_id cardTitle mainImg language createdAt updatedAt")
      .sort({ createDate: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

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
