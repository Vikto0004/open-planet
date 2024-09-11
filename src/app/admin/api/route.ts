import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDatafromToken } from "@/helpers/tokenServices";
import { HomeModel } from "@/models/home-model";

connect();

export async function GET(request: NextRequest) {
  try {
    const userData = getDatafromToken(request);

    const homeData = await HomeModel.find();

    console.log(homeData);

    const data = {};

    return NextResponse.json({ userData, data, status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    // const userData = getDatafromToken(req);

    const reqBody = await req.json();

    const res = await HomeModel.create(reqBody);

    return NextResponse.json({ res });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
