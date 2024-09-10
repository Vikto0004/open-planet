import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDatafromToken } from "@/helpers/tokenServices";

connect();

export async function GET(req: NextRequest) {
  try {
    const userData = getDatafromToken(req);

    return NextResponse.json({ userData, status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
