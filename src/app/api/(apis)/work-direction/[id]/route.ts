import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { SectionTextModel } from "@/models/sectionText-model";
import {
  workDirectionSchemaJoi,
  WorkDirectionsModel,
} from "@/models/workDirections-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinaryDeleteImages } from "@/services/cloudinaryDeleteImages";
import { getDataFromToken } from "@/services/tokenServices";

connect();
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { id } = params;

    if (!id) throw errorHandler("Bad request", 400);

    const newTextFields = await SectionTextModel.create({});

    const workDirection = await WorkDirectionsModel.findById({
      _id: id,
    });

    workDirection.sectionText.push(newTextFields._id);
    await workDirection.save();

    return NextResponse.json({ workDirection }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { id } = params;

    if (!id) throw errorHandler("Bad request", 400);

    const data = await req.json();

    const validation = workDirectionSchemaJoi.validate(data);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }

    const updateResult = await WorkDirectionsModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...data,
        },
      },
      { new: true },
    );

    if (!updateResult) {
      throw errorHandler("Work direction not found", 404);
    }

    return NextResponse.json({ updateResult }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await SectionTextModel.find();
    const { id } = params;

    if (!id) throw errorHandler("Bad request", 400);

    const workDirection = await WorkDirectionsModel.findById({
      _id: id,
    }).populate("sectionText");

    if (!workDirection) throw errorHandler("Work direction not found", 404);

    return NextResponse.json({ workDirection });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { id } = params;

    if (!id) throw errorHandler("Bad request", 400);

    const result = await WorkDirectionsModel.findOne({ _id: id });

    if (!result) throw errorHandler("Work direction not found", 404);

    if (result.mainImg) {
      await cloudinaryDelete(result.mainImg);
    }

    if (result.images.length > 0) {
      await cloudinaryDeleteImages(result.images);
    }

    if (result.sectionText.length > 0) {
      await SectionTextModel.deleteMany({ _id: { $in: result.sectionText } });
    }

    const res = await WorkDirectionsModel.deleteOne({ _id: id });

    if (!res.acknowledged) {
      throw errorHandler("Work direction not found", 404);
    }

    return NextResponse.json(
      { message: "Work direction deleted" },

      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
