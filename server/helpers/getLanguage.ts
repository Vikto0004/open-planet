import { NextRequest } from "next/server";

import { errorHandler } from "@/errors/errorHandler";

export default async function getLanguage(req: NextRequest) {
  const pathName = await req.nextUrl.pathname.split("/")[2];

  if (!pathName) throw errorHandler("Request is not found");

  return pathName;
}
