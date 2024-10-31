import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import getPagination from "@/helpers/getPagination";
import getSearchParams from "@/helpers/getSearchParams";
import { WorkDirectionsModel } from "@/models/workDirections-model";
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
      !["medicine", "electric", "education", "restoration", "culture"].includes(type)
    )
      throw errorHandler("Bad request wrong type", 400);

    if (type === "") throw errorHandler("Bad request wrong type", 400);

    if (!language) throw errorHandler("Bad request", 400);

    const queryCondition = {
      [`${language}.isPosted`]: isAdmin ? { $in: [true, false] } : true,
      ...(type && { [`${language}.workDirectionsType`]: { $in: [type] } }),
    };
    const totalWorkDirections = await WorkDirectionsModel.countDocuments(queryCondition);

    const workDirections = await WorkDirectionsModel.find(queryCondition)
      .select(`_id ${language}.cardTitle ${language}.mainImg createdAt updatedAt`)
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
