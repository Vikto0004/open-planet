
import { NextRequest, NextResponse } from "next/server";
import { removeToken } from "@/services/tokenServices";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function POST(request: NextRequest) {
  try {

    await removeToken(request);

    const response = NextResponse.json({ message: "Successful logout" });

    response.cookies.delete
      ("token");

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}