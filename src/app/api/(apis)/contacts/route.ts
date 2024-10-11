import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { createContactsSchemaJoi } from "@/models/contacts-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function POST(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Forbidden is not admin or not authorized", 403);

    const reqBody = await req.json();

    const validation = createContactsSchemaJoi.validate(reqBody);

    const language = reqBody.language;

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }

    return NextResponse.json({ language });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
