import { NextRequest } from "next/server";

import { getDataFromToken } from "@/services/tokenServices";

import { errorHandler } from "./errorHandler";

export const isUserExist = async (req: NextRequest) => {
  const userData = getDataFromToken(req);
  if (userData?.role !== "admin")
    throw errorHandler("Not authorized or not admin", 403);
};
