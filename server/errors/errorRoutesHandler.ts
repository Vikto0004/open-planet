import { NextResponse } from "next/server";

interface CustomError extends Error {
  status?: number;
}

export function handleRoutesError(error: unknown) {
  const customError = error as CustomError;
  const errorMessage = customError.message || "An unknown formError occurred";
  const statusCode = customError.status || 500;

  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}