import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDatafromToken } from "@/helpers/tokenServices";

connect();

export async function GET(request: NextRequest) {
  try {
    const userData = getDatafromToken(request);

    return NextResponse.json({ userData });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
