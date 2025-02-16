import axios from "axios";

import { LangType } from "@/i18n/routing";

import { Tenders, TendersPaginated } from "../types/tenders";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://openplanetua.org/";

export async function getTendersPaginated(
  page: number,
  limit: number = 3,
  lang: LangType,
): Promise<TendersPaginated> {
  const response = await axios.get(
    `${domain}/api/${lang}/tenders?page=${page}&limit=${limit}`,
  );
  return response.data;
}

export async function getTenderById(
  tenderId: string,
  lang: LangType,
): Promise<Tenders> {
  return (
    await axios.get(`${domain}/api/${lang}/tenders/${tenderId}`, {
      headers: { "Cache-Control": "max-age=0, s-maxage=60" },
    })
  ).data.response;
}
