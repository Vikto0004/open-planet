import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { ContactsModel, contactsSchemaJoi } from "@/models/contacts-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function PUT(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);
    const language = await getLanguage(req);

    const reqBody = await req.json();

    const validation = contactsSchemaJoi.validate(reqBody);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }

    const res = await ContactsModel.findOneAndUpdate(
      { language: language },
      {
        $set: {
          ...reqBody,
        },
      },
      { new: true },
    );

    return NextResponse.json({ response: res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
