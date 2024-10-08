import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const user = getDataFromToken(req);

    if (!user) throw errorHandler("User by token is not found", 401);

    return NextResponse.json({ user });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
