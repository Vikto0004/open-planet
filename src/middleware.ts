// import { chain } from "@/middlewares/chain";
// import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";
// import { withI18nMiddleware } from "@/middlewares/withI18nMiddleware";

// export default chain([withAuthMiddleware, withI18nMiddleware]);

// export const config = {
//   matcher: ["/((?!_next).*)"],
// };

import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ua|en)/:path*"],
};
