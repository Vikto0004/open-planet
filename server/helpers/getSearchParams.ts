import { NextRequest } from "next/server";

export default async function getSearchParams(req: NextRequest, key: string) {
  const param = await req.nextUrl.searchParams.get(key);

  return param;
}
