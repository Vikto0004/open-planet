import { getDatafromToken } from "@/services/tokenServices";
import { NextRequest } from "next/server";
import { errorHandler } from "./errorHandler";

export const isUserExist = async (req: NextRequest) => {
  const userData = getDatafromToken(req);
  if (userData?.role !== "admin") throw errorHandler("Not authorized or not admin", 403);
}