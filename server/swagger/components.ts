import { authComponents } from "./auth/authComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { workDirectionComponents } from "./workDirection/workDirectionComponents";

export const components = {
  ...authComponents,
  ...helpComponents,
  ...workDirectionComponents,
  ...faqComponents,
};
