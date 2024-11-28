import { NextRequest } from "next/server";

import { errorHandler } from "@/errors/errorHandler";

import cloudinary from "../utils/cloudinary";

interface CloudinaryUploadResult {
  pablic_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function cloudinarySave(req: NextRequest) {
  const formData = await req.formData();

  const file: File | null = formData.get("file") as unknown as File;

  if (!file) throw errorHandler('Name "file" is not found', 400);
  const fileName = file.name.split(".")[0];
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<CloudinaryUploadResult>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "open-planet-image", public_id: fileName },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as unknown as CloudinaryUploadResult);
        },
      );
      uploadStream.end(buffer);
    },
  );

  return result;
}
