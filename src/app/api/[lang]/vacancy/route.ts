import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import getPagination from "@/helpers/getPagination";
import { VacancyModel } from "@/models/vacancy-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);
    const userData = getDataFromToken(req);

    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";
    const { page, limit } = await getPagination(req);

    if (!language) throw errorHandler("Bad request", 400);

    const queryCondition = {
      isPosted: isAdmin ? { $in: [true, false] } : { $in: [true] },
    };

    const totalVacancy = await VacancyModel.countDocuments(queryCondition);
    const vacancy = await VacancyModel.find(queryCondition)
      .select(`${language} createdAt updatedAt`)
      .sort({ createdAt: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    if (!vacancy || vacancy.length === 0)
      throw errorHandler("Vacancy by this language is not found", 404);

    return NextResponse.json({
      vacancy,
      totalVacancy,
    });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
