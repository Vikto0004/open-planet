import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import getPagination from "@/helpers/getPagination";
import getSearchParams from "@/helpers/getSearchParams";
import { ProjectsModel } from "@/models/projects-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);
    const type = await getSearchParams(req, "type");
    const userData = getDataFromToken(req);

    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";
    const { page, limit } = await getPagination(req);

    if (
      type &&
      ![
        "medicine",
        "electric",
        "education",
        "restoration",
        "culture",
        "all",
      ].includes(type)
    )
      throw errorHandler("Bad request wrong type", 400);

    if (type === "" || !type) throw errorHandler("Bad request wrong type", 400);

    if (!language) throw errorHandler("Bad request", 400);

    const queryCondition = {
      isPosted: isAdmin ? { $in: [true, false] } : { $in: [true] },
      ...(type !== "all" && { workDirectionsType: { $in: [type] } }),
    };
    const totalWorkDirections =
      await ProjectsModel.countDocuments(queryCondition);
    const workDirections = await ProjectsModel.find(queryCondition)
      .select(`${language} createdAt updatedAt workDirectionsType`)
      .sort({ createDate: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!workDirections || workDirections.length === 0)
      throw errorHandler("Work directions by this language is not found", 404);

    return NextResponse.json({
      workDirections,
      totalWorkDirections,
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
