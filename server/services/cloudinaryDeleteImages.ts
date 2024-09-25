import { handleRoutesError } from "@/errors/errorRoutesHandler";

import cloudinary from "../utils/cloudinary";

export async function cloudinaryDeleteImages(images: string[]) {
  try {
    const destroyAllImages = await Promise.all(
      images.map(async (image) => {
        const idDeleteCloudinary = `open-planet-image/${image.split("/").reverse()[0].split(".")[0]}`;

        return await cloudinary.uploader.destroy(idDeleteCloudinary);
      }),
    );

    return destroyAllImages;
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}
