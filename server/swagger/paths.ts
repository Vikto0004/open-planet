import { authPaths } from "./auth/authPaths";
import { faqPaths } from "./faq/faqPaths";
import { workDirectionPaths } from "./workDirection/workDirectionPaths";

export const paths = {
  ...authPaths,
  ...workDirectionPaths,
  ...faqPaths,
};
