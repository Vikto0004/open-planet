import { NextRequest } from "next/server";

import { errorHandler } from "@/errors/errorHandler";

import cloudinary from "../utils/cloudinary";

interface CloudinaryUploadResult {
  public_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function cloudinarySaveImagesArray(req: NextRequest) {
  const formData = await req.formData();

  const files: File[] = formData.getAll("files") as unknown as File[];

  if (!files || files.length === 0) throw errorHandler("No files found", 400);

  const uploadResults: CloudinaryUploadResult[] = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "open-planet-image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as unknown as CloudinaryUploadResult);
          },
        );
        uploadStream.end(buffer);
      },
    );

    uploadResults.push(result);
  }

  return uploadResults;
}
