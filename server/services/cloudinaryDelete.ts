import { handleRoutesError } from "@/errors/errorRoutesHandler";

import cloudinary from "../utils/cloudinary";

export async function cloudinaryDelete(image: string) {
  try {
    const decodedUrl = decodeURIComponent(image);
    const idDeleteCloudinary = decodedUrl
      .split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, "");

    const result = await cloudinary.uploader.destroy(idDeleteCloudinary);
    return result;
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
