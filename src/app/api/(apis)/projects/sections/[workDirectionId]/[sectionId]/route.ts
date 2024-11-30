import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { ProjectsModel } from "@/models/projects-model";
import { getDataFromToken } from "@/services/tokenServices";

import mongoose from "mongoose";

export interface Section {
    id: string;
    sectionType: string;
    content: [] | string;
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { workDirectionId: string; sectionId: string } },
) {
    try {
        const userData = getDataFromToken(req);
        if (userData?.role !== "admin")
            throw errorHandler("Not authorized or not admin", 403);

        const { workDirectionId, sectionId } = params;

        if (!workDirectionId || !sectionId)
            throw errorHandler("Bad request: Missing parameters", 400);

        const workDirection = await ProjectsModel.findById(workDirectionId);
        if (!workDirection) throw errorHandler("Work direction not found", 404);

        const sectionExistsUa = (workDirection.ua.sections).find((section: Section) => section.id.toString() === sectionId);
        const sectionExistsEn = (workDirection.en.sections).find((section: Section) => section.id.toString() === sectionId);

        if (!sectionExistsUa || !sectionExistsEn) {
            throw errorHandler("Section not found", 404);
        }

        const result = await ProjectsModel.findByIdAndUpdate(
            { _id: workDirectionId },
            {
                $pull: {
                    "ua.sections": { id: sectionId },
                    "en.sections": { id: sectionId },
                },
            },
            { new: true },
        );

        if (!result) throw errorHandler("Failed to delete section", 500);

        return NextResponse.json(
            {
                message: "Section is deleted",
                result,
            },
            { status: 200 },
        );
    } catch (error: unknown) {
        return handleRoutesError(error);
    }
}


export async function POST(
    req: NextRequest,
    { params }: { params: { workDirectionId: string, sectionId: string } },
) {
    try {
        const userData = getDataFromToken(req);
        if (userData?.role !== "admin")
            throw errorHandler("Not authorized or not admin", 403);

        const { workDirectionId, sectionId } = params;

        if (!workDirectionId) throw errorHandler("Bad request", 400);

        const itemId = new mongoose.Types.ObjectId().toString();

        const newItem = {
            id: itemId,
            title: "",
            amount: "",
        };

        const workDirection = await ProjectsModel.findById(workDirectionId);
        if (!workDirection) throw errorHandler("Work direction not found", 404);

        const sectionIndexUa = (workDirection.ua.sections).findIndex((section: Section) => section.id.toString() === sectionId);
        const sectionIndexEn = (workDirection.en.sections).findIndex((section: Section) => section.id.toString() === sectionId);

        if (sectionIndexUa === -1 || sectionIndexEn === -1) {
            throw errorHandler("Section not found", 404);
        }

        const uaPath = `ua.sections.${sectionIndexUa}.content`;
        const enPath = `en.sections.${sectionIndexEn}.content`;

        const result = await ProjectsModel.findByIdAndUpdate(
            { _id: workDirectionId },
            {
                $push: {
                    [uaPath]: newItem,
                    [enPath]: newItem,
                },
            },
            { new: true },
        );

        if (result === null) throw errorHandler("Work direction not found", 404);

        return NextResponse.json(
            {
                message: "Section saved",
                result,
            },
            { status: 200 },
        );
    } catch (error: unknown) {
        return handleRoutesError(error);
    }
}
