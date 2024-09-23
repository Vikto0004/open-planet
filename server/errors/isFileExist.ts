import { NextRequest } from "next/server"
import { errorHandler } from "./errorHandler"

export const isFileExist = async (req: NextRequest) => {
  const formData = await req.formData()


  const file = formData.get('file') as File | null

  if (!file) throw errorHandler("File is not found", 400)

  return req
}