import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { FaqModel } from "@/models/faq-model";

connect();

export async function GET(req: NextRequest) {
  try {
    const language = await getLanguage(req);
    const faq = await FaqModel.find({ language: language });
    return NextResponse.json({ faq });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
