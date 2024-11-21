import { NextRequest, NextResponse } from "next/server";

import { errorHandler } from "@/errors/errorHandler";
import { handleRoutesError } from "@/errors/errorRoutesHandler";
import { ProjectsModel } from "@/models/projects-model";
import { cloudinaryDelete } from "@/services/cloudinaryDelete";
import { cloudinarySaveImagesArray } from "@/services/cloudinarySaveImages";
import { getDataFromToken } from "@/services/tokenServices";

export async function POST(
  req: NextRequest,
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);

    const { workDirectionId } = params;

    if (!workDirectionId) throw errorHandler("Bad request", 400);

    const saveImageResult = await cloudinarySaveImagesArray(req);

    const imageData = saveImageResult.map((image) => image.url);
    const workDirection = await ProjectsModel.findById(workDirectionId);
    let uaImageListIndex = workDirection.ua.sections.findIndex(
      (section: { sectionType: string }) => section.sectionType === "imageList",
    );
    if (uaImageListIndex === -1) {
      workDirection.ua.sections.push({ sectionType: "imageList", content: [] });
      uaImageListIndex = workDirection.ua.sections.length - 1;
    }
    let enImageListIndex = workDirection.en.sections.findIndex(
      (section: { sectionType: string }) => section.sectionType === "imageList",
    );
    if (enImageListIndex === -1) {
      workDirection.en.sections.push({ sectionType: "imageList", content: [] });
      enImageListIndex = workDirection.en.sections.length - 1;
    }
    await workDirection.save();

    const uaPath = `ua.sections.${uaImageListIndex}.content`;
    const enPath = `en.sections.${enImageListIndex}.content`;

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
        message: "Image saved",
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
  { params }: { params: { workDirectionId: string } },
) {
  try {
    const userData = getDataFromToken(req);
    if (userData?.role !== "admin")
      throw errorHandler("Not authorized or not admin", 403);
    const { workDirectionId } = params;
    const request = await req.json();
    const imageUrlToDelete = request.imageUrl;

    if (!imageUrlToDelete) throw errorHandler("Add image Url to delete", 400);

    const workDirection = await ProjectsModel.findById(workDirectionId);
    const uaImageListSection = workDirection.ua.sections.find(
      (section: { sectionType: string }) => section.sectionType === "imageList",
    );


    const enImageListSection = workDirection.en.sections.find(
      (section: { sectionType: string }) => section.sectionType === "imageList",
    );

    const isImgExistInArray =
      (uaImageListSection?.content || []).includes(imageUrlToDelete) ||
      (enImageListSection?.content || []).includes(imageUrlToDelete);

    if (!isImgExistInArray)
      throw errorHandler("Image does not exist in this work direction", 400);

    const deletedImage = await cloudinaryDelete(request.imageUrl);

    if (deletedImage.result !== "ok")
      throw errorHandler("Image not found", 404);

    const uaPath = uaImageListSection
      ? `ua.sections.${workDirection.ua.sections.indexOf(uaImageListSection)}.content`
      : null;
    const enPath = enImageListSection
      ? `en.sections.${workDirection.en.sections.indexOf(enImageListSection)}.content`
      : null;


    const updateQuery: Record<string, any> = {};
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
