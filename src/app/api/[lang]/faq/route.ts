import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import getLanguage from "@/helpers/getLanguage";
import { FaqModel } from "@/models/faq-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    const isAdmin =
      userData?.role === "admin" || userData?.role === "moderator";
    console.log("🚀 ~ GET ~ isAdmin:", isAdmin);
    const language = await getLanguage(req);

    const queryCondition: { language: string; isPosted?: boolean } = {
      language: language,
    };

    if (!isAdmin) {
      queryCondition.isPosted = true;
    }
    console.log(queryCondition);

    const faq = await FaqModel.find(queryCondition);
    return NextResponse.json({ faq });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
