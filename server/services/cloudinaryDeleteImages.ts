import { handleRoutesError } from "@/errors/errorRoutesHandler";

import cloudinary from "../utils/cloudinary";
export async function cloudinaryDeleteImages(
  images: string[]
): Promise<{ result: string; error?: unknown }[]> {
  try {
    const destroyAllImages = await Promise.all(
      images.map(async (image) => {
        try {
          const decodedUrl = decodeURIComponent(image);
          if (!decodedUrl.includes("/")) {
            throw new Error(`Invalid URL format: ${decodedUrl}`);
          }

          const idDeleteCloudinary = decodedUrl
            .split("/")
            .slice(-2)
            .join("/")
            .replace(/\.[^/.]+$/, "");

          const result = await cloudinary.uploader.destroy(idDeleteCloudinary);

          if (result.result !== "ok") {
            console.error(`Failed to delete image: ${decodedUrl}`);
          }
          return result;
        } catch (err) {
          console.error(`Error deleting image: ${image}`, err);
          return { result: "error", error: err };
        }
      })
    );

    return destroyAllImages;
  } catch (error: unknown) {
    return [{ result: "error", error }];
  }
}
