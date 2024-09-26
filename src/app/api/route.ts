import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { HomeModel } from "@/models/home-model";
import { getDatafromToken } from "@/services/tokenServices";

export async function POST(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);
    if (userData?.role !== "admin") throw errorHandler("Forbidden", 403);
    const reqBody = await req.json();

    const res = await HomeModel.create(reqBody);

    return NextResponse.json({ res });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
