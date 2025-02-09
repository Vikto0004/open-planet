import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { langs } from "@/i18n/routing";
import {
  nodeSchemaJoi,
  updateLocalizedSchemaJoi,
  VacancyModel,
} from "@/models/vacancy-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const language = await getLanguage(req);
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);
    if (!language) throw errorHandler("Bad request", 400);
    const data = await req.json();
    const validation = updateLocalizedSchemaJoi.validate(data);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }
    const updateFields = {
      [`${language}`]: validation.value,
    };

    await VacancyModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    const updatedDocument = await VacancyModel.findById(id).select(
      `${language} createdAt updatedAt `,
    );

    if (!updatedDocument) {
      throw errorHandler("News not found", 404);
    }

    return NextResponse.json({ response: updatedDocument }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);

    const vacancy = await VacancyModel.findById(id).select(
      `${langs.join(" ")} createdAt updatedAt`,
    );

    if (!vacancy) throw errorHandler("Vacancy not found", 404);

    return NextResponse.json({ response: vacancy });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const language = await getLanguage(req);
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);
    if (!language) throw errorHandler("Bad request", 400);

    const data = await req.json();
    const validation = nodeSchemaJoi.validate(data);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }
    const updatedVacancy = await VacancyModel.findByIdAndUpdate(
      id,
      { $set: { [`${language}.description`]: data } },
      { new: true, runValidators: true },
    );

    if (!updatedVacancy) {
      throw errorHandler("Vacancy not found", 404);
    }

    return NextResponse.json({ response: updatedVacancy });
  } catch (error) {
    return handleRoutesError(error);
  }
}
