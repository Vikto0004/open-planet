"use server";

import { cookies } from "next/headers";

export async function setProjectTitle(projectTitle: string) {
  const cookieStore = cookies();
  cookieStore.set("project-title", projectTitle, { path: "/" });
}
