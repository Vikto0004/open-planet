import { chain } from "@/middlewares/chain";
import { swaggerMiddleware } from "@/middlewares/swaggerMiddleware";
import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";
import { withI18nMiddleware } from "@/middlewares/withI18nMiddleware";

export default chain([
  swaggerMiddleware,
  withAuthMiddleware,
  withI18nMiddleware,
]);

export const config = {
  matcher: ["/((?!_next).*)"],
};
