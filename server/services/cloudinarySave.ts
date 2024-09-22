import { errorHandler } from "@/errors/errorHandler"
import { handleRoutesError } from "@/errors/errorRoutesHandler"
import { NextRequest } from "next/server"
import cloudinary from "../utils/cloudinary"

interface CloudinaryUploadResult { pablic_id: string, [key: string]: any, }

export async function cloudinarySave(req: NextRequest) {

  try {

    const formData = await req.formData()



    const file = formData.get('file') as File | null


    if (!file) throw errorHandler('File is not found', 400)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: "open-planet-image" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as unknown as CloudinaryUploadResult)
        }
      )
      uploadStream.end(buffer)
    })

    return result
  } catch (error: unknown) {
    return handleRoutesError(error);
  }
}