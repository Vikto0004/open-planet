import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { ProjectsModel } from "@/models/projects-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinarySaveImagesArray } from "@/services/cloudinarySaveImages";
import { getDataFromToken } from "@/services/tokenServices";

import { Section } from "../../../sections/[workDirectionId]/[sectionId]/route";

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

    const saveImageResult = await cloudinarySaveImagesArray(req);
    const imageData = saveImageResult.map((image) => image.url);
    const workDirection = await ProjectsModel.findById(workDirectionId);

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
          [uaPath]: { $each: imageData },
          [enPath]: { $each: imageData },
        },
      },
      { new: true },
    );

    if (result === null) throw errorHandler("Work direction not found", 404);

    return NextResponse.json(
      {
        message: "Images saved",
        result,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { workDirectionId: string, sectionId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);
    const { workDirectionId, sectionId } = params;
    const request = await req.json();
    const imageUrlToDelete = request.imageUrl;

    if (!imageUrlToDelete) throw errorHandler("Add image Url to delete", 400);

    const workDirection = await ProjectsModel.findById(workDirectionId);


    const sectionIndexUa = (workDirection.ua.sections).findIndex((section: Section) => section.id.toString() === sectionId);
    const sectionIndexEn = (workDirection.en.sections).findIndex((section: Section) => section.id.toString() === sectionId);

    const imageListUa = (workDirection.ua.sections).find((section: Section) => section.id.toString() === sectionId);
    const imageListEn = (workDirection.en.sections).find((section: Section) => section.id.toString() === sectionId);

    if (sectionIndexUa === -1 || sectionIndexEn === -1) {
      throw errorHandler("Section not found", 404);
    }

    const isImgExistInArray =
      (imageListUa.content).includes(imageUrlToDelete) ||
      (imageListEn.content).includes(imageUrlToDelete);

    if (!isImgExistInArray)
      throw errorHandler("Image does not exist in this section", 400);


    const uaPath = `ua.sections.${sectionIndexUa}.content`;
    const enPath = `en.sections.${sectionIndexEn}.content`;


    const deletedImage = await cloudinaryDelete(request.imageUrl);

    if (deletedImage.result !== "ok")
      throw errorHandler("Image not found", 404);

    const updateQuery: Record<string, string> = {};
    if (uaPath) updateQuery[uaPath] = imageUrlToDelete;
    if (enPath) updateQuery[enPath] = imageUrlToDelete;

    const result = await ProjectsModel.findByIdAndUpdate(
      { _id: workDirectionId },
      {
        $pull: updateQuery,
      },
      { new: true },
    );

    return NextResponse.json(
      {
        message: "Image is deleted",
        result,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
