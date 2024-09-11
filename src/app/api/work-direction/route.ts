import { NextRequest, NextResponse } from "next/server";


import { HomeModel } from "../../../../server/models/home-model";
import { workDirectionsModel } from "../../../../server/models/workDirections-model";

export async function POST(req: NextRequest) {
  try {


    const reqBody = await req.json();

    const res = await workDirectionsModel.create(reqBody);

    const getLang = await HomeModel.findOne({ _id: reqBody.languageId });
    console.log(getLang);

    getLang.workDirections.push(res._id);

    await getLang.save();

    return NextResponse.json({ res, status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
