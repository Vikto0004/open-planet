import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import {
  projectSchemaJoi,
  ProjectsModel,
} from "@/models/projects-model";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const reqBody = await req.json();

    const validation = projectSchemaJoi.validate(reqBody);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }


    const res = await ProjectsModel.create(reqBody);

    return NextResponse.json({ response: res }, { status: 201 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}