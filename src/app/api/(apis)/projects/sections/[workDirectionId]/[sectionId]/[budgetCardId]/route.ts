import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { ProjectsModel } from "@/models/projects-model";
import { getDataFromToken } from "@/services/tokenServices";

import { Section } from "../route";

interface Item {
    id: string;
    title: string;
    amount: string;
}


export async function DELETE(
    req: NextRequest,
    { params }: { params: { workDirectionId: string; sectionId: string, budgetCardId: string } },
) {
    try {
        const userData = getDataFromToken(req);
        if (userData?.role !== "admin")
            throw errorHandler("Not authorized or not admin", 403);

        const { workDirectionId, sectionId, budgetCardId } = params;

        if (!workDirectionId || !sectionId || !budgetCardId)
            throw errorHandler("Bad request: Missing parameters", 400);

        const workDirection = await ProjectsModel.findById(workDirectionId);
        if (!workDirection) throw errorHandler("Work direction not found", 404);

        const sectionExistsUa = workDirection.ua.sections.find((section: Section) => section.id.toString() === sectionId);
        const sectionExistsEn = workDirection.en.sections.find((section: Section) => section.id.toString() === sectionId);

        if (!sectionExistsUa || !sectionExistsEn) {
            throw errorHandler("Section not found", 404);
        }

        const itemExistsUa = sectionExistsUa.content.find((item: Item) => item.id === budgetCardId);
        const itemExistsEn = sectionExistsEn.content.find((item: Item) => item.id === budgetCardId);

        if (!itemExistsUa || !itemExistsEn) {
            throw errorHandler("Item not found", 400);
        }

        const sectionIndexUa = workDirection.ua.sections.findIndex((section: Section) => section.id.toString() === sectionId);
        const sectionIndexEn = workDirection.en.sections.findIndex((section: Section) => section.id.toString() === sectionId);


        const uaPath = `ua.sections.${sectionIndexUa}.content`;
        const enPath = `en.sections.${sectionIndexEn}.content`;


        const result = await ProjectsModel.findByIdAndUpdate(
            { _id: workDirectionId },
            {
                $pull: {
                    [uaPath]: { id: budgetCardId },
                    [enPath]: { id: budgetCardId },
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
