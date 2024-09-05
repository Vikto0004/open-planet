import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { NextRequest } from "next/server";

import TokenModel from "@/models/token-model";

type TPayload = {
  _id: ObjectId;
  email: string;
  role: string;
};

export const getDatafromToken = (request: NextRequest): TPayload | null => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TPayload;

    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const generateToken = async (payload: TPayload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  console.log(token);

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
