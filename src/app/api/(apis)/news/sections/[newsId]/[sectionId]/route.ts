import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { NewsModel } from "@/models/news-model";
import { cloudinaryDeleteImages } from "@/services/cloudinaryDeleteImages";
import { getDataFromToken } from "@/services/tokenServices";

export interface Section {
    id: string;
    sectionType: string;
    content: [] | string;
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { newsId: string; sectionId: string } },
) {
    try {
        const userData = getDataFromToken(req);
        if (userData?.role !== "admin")
            throw errorHandler("Not authorized or not admin", 403);

        const { newsId, sectionId } = params;

        if (!newsId || !sectionId)
            throw errorHandler("Bad request: Missing parameters", 400);

        const news = await NewsModel.findById(newsId);
        if (!news) throw errorHandler("News not found", 404);

        const sectionExistsUa = news.ua.sections.find(
            (section: Section) => section.id.toString() === sectionId,
        );
        const sectionExistsEn = news.en.sections.find(
            (section: Section) => section.id.toString() === sectionId,
        );

        if (!sectionExistsUa || !sectionExistsEn) {
            throw errorHandler("Section not found", 404);
        }
        if (
            sectionExistsUa.sectionType === "imageList" ||
            (sectionExistsEn.sectionType === "imageList" &&
                sectionExistsUa.content.length !== 0)
        ) {
            const deletedImages = await cloudinaryDeleteImages(
                sectionExistsUa.content || sectionExistsEn.content,
            );
            deletedImages.forEach((image) => {
                if (image.result === "error") {
                    throw errorHandler("Image not found", 404);
                }
            });
        }

        const result = await NewsModel.findByIdAndUpdate(
            { _id: newsId },
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