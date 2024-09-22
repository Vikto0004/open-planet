
import { handleRoutesError } from "@/errors/errorRoutesHandler"

import cloudinary from "../utils/cloudinary"

interface IRequest {
  url: string,
  header: string
  description: string
}

export async function cloudinaryDelete(image: IRequest) {
  try {
    const idDeleteCloudinary = `open-planet-image/${image.url.split("/").reverse()[0].split(".")[0]
      }`;

    const result = await cloudinary.uploader.destroy(idDeleteCloudinary);

    return result
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}