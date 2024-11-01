import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import {
  workDirectionUpdateSchemaJoi,
  WorkDirectionsModel,
} from "@/models/workDirections-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinaryDeleteImages } from "@/services/cloudinaryDeleteImages";
import { getDataFromToken } from "@/services/tokenServices";

connect();
// export async function POST(
//   req: NextRequest,
// ) {
//   try {
//     const userData = getDataFromToken(req);
//     if (userData?.role !== "admin") {
//       throw errorHandler("Not authorized or not admin", 403);
//     }

//     const data = await req.json();
//     const validation = workDirectionSchemaJoi.validate(data);

//     if (validation.error) {
//       throw errorHandler(validation.error.message, 400);
//     }

//     const newWorkDirection = await WorkDirectionsModel.create(data);

//     return NextResponse.json(
//       { response: newWorkDirection },
//       { status: 201 },
//     );
//   } catch (error: unknown) {
//     return handleRoutesError(error);
//   }
// }

export async function PUT(
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

    const data = await req.json();
    const validation = workDirectionUpdateSchemaJoi.validate(data);

    if (validation.error) {
      throw errorHandler(validation.error.message, 400);
    }
    console.log(validation.value)
    const updateResult = await WorkDirectionsModel.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
        },
      },
      { new: true, runValidators: true },
    );

    if (!updateResult) {
      throw errorHandler("Work direction not found", 404);
    }

    return NextResponse.json({ response: updateResult }, { status: 200 });
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);

    const workDirection = await WorkDirectionsModel.findById(id);
    if (!workDirection) throw errorHandler("Work direction not found", 404);

    return NextResponse.json({ response: workDirection });
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
    if (userData?.role !== "admin") {
      throw errorHandler("Not authorized or not admin", 403);
    }

    const { id } = params;
    if (!id) throw errorHandler("Bad request", 400);

    const result = await WorkDirectionsModel.findOne({ _id: id });
    if (!result) throw errorHandler("Work direction not found", 404);

    if (result.ua.mainImg) {
      await cloudinaryDelete(result.ua.mainImg);
    }
    if (result.en.mainImg) {
      await cloudinaryDelete(result.en.mainImg);
    }

    const allSections = [...result.ua.sections, ...result.en.sections];

    for (const section of allSections) {
      if (section.type === "imageList" && Array.isArray(section.content)) {
        await cloudinaryDeleteImages(section.content);
      }
    }

    await WorkDirectionsModel.deleteOne({ _id: id });

    return NextResponse.json(
      { message: "Work direction deleted" },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
