import { handleRoutesError } from "@/errors/errorRoutesHandler";

import cloudinary from "../utils/cloudinary";

export async function cloudinaryDelete(image: string) {
  try {
    const idDeleteCloudinary = `open-planet-image/${image.split("/").reverse()[0].split(".")[0]}`;

    const result = await cloudinary.uploader.destroy(idDeleteCloudinary);

    return result;
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
