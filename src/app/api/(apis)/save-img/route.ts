import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { cloudinarySave } from "@/services/cloudinarySave";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(req: NextRequest) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const saveImageResult = await cloudinarySave(req);

    return NextResponse.json(
      {
        message: "Image saved",
        result: saveImageResult,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
