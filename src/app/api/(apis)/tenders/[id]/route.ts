import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { TendersModel } from "@/models/tenders-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);

    const result = await TendersModel.findOne({ _id: id });
    if (!result) throw errorHandler("Tender not found", 404);

    await TendersModel.deleteOne({ _id: id });

    return NextResponse.json({ message: "Tender deleted" }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
