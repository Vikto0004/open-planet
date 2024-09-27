import { NextRequest } from "next/server";

import { errorHandler } from "@/errors/errorHandler";

export default async function getPagination(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  if (!page || !limit)
    throw errorHandler("Bad request: page and limit are required", 400);

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (isNaN(pageNumber) || isNaN(limitNumber))
    throw errorHandler(
      "Bad request: page and limit must be valid numbers",
      400,
    );

  if (pageNumber < 1 || limitNumber < 1)
    throw errorHandler(
      "Bad request: page and limit must be greater than 0",
      400,
    );

  return { page: pageNumber, limit: limitNumber };
}
