import { cookies } from "next/headers";

export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
};
