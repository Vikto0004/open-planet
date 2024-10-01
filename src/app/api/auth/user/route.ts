import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { getDatafromToken } from "@/services/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const user = getDatafromToken(req);

    if (!user) throw errorHandler("User not found", 404);

    return NextResponse.json({ user });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
