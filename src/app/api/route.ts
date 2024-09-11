import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";

import { HomeModel } from "@/models/home-model";
import { getDatafromToken } from "@/services/tokenServices";


connect();

export async function GET(request: NextRequest) {
  try {
    const userData = getDatafromToken(request);

    const homeData = await HomeModel.find();





    return NextResponse.json({ homeData });
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
    const userData = getDatafromToken(req);

    const reqBody = await req.json();

    const res = await HomeModel.create(reqBody);


    return NextResponse.json({ res, userData });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}