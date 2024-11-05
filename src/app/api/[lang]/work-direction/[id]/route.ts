import { NextRequest, NextResponse } from "next/server";
import getLanguage from "@/helpers/getLanguage";
import { connect } from "@/dbConfig/dbConfig";
import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import {
    updateLanguageJoiSchema,
    WorkDirectionsModel,
} from "@/models/workDirections-model";
import { getDataFromToken } from "@/services/tokenServices";

connect();

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const language = await getLanguage(req);
        const userData = getDataFromToken(req);
        if (userData?.role !== "admin") {
            throw errorHandler("Not authorized or not admin", 403);
        }

        const { id } = params;
        if (!id) throw errorHandler("Bad request", 400);
        if (!language) throw errorHandler("Bad request", 400);
        const data = await req.json();
        const validation = updateLanguageJoiSchema.validate(data);

        if (validation.error) {
            throw errorHandler(validation.error.message, 400);
        }
        const updateFields = {
            [`${language}`]: validation.value,
        };


        await WorkDirectionsModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );


        const updatedDocument = await WorkDirectionsModel.findById(id).select(`${language}`);


        if (!updatedDocument) {
            throw errorHandler("Work direction not found", 404);
        }

        return NextResponse.json({ response: updatedDocument }, { status: 200 });
    } catch (error: unknown) {
        return handleRoutesError(error);
    }
}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const language = await getLanguage(req);
        const { id } = params;
        if (!id) throw errorHandler("Bad request", 400);
        if (!language) throw errorHandler("Bad request", 400);
        const workDirection = await WorkDirectionsModel.findById(id).select(`${language}`);
        if (!workDirection) throw errorHandler("Work direction not found", 404);

        return NextResponse.json({ response: workDirection });
    } catch (error: unknown) {
        return handleRoutesError(error);
    }
}
