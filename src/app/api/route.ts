import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { getDataFromToken } from "@/services/tokenServices";
connect();
export async function POST(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);

    const reqBody = await req.json();

    const res = await HomeModel.create(reqBody);

    return NextResponse.json({ response: res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
