import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

import TokenModel from "@/models/token-model";

export type TPayload = {
  _id: ObjectId;
  email: string;
  role: string;
};

export const getDatafromToken = (request: NextRequest): TPayload | null => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log("🚀 ~ getDatafromToken ~ token:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TPayload;

    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const generateToken = (payload: TPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return token;
};

export const saveToken = async (userId: ObjectId, token: string) => {
  const tokenData = await TokenModel.findOne({ user: userId });

  if (tokenData) {
    tokenData.token = token;
    return tokenData.save();
  }

  return TokenModel.create({ user: userId, token });
};

export const removeToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  const tokenData = await TokenModel.deleteOne({ token });
  return tokenData;
};
