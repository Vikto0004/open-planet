import { authComponents } from "./auth/authComponents";
import { contactsComponents } from "./contacts/contactsComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { textSectionComponents } from "./textSection/textSectionComponents";
import { workDirectionComponents } from "./workDirection/workDirectionComponents";

export const components = {
  ...authComponents,
  ...helpComponents,
  ...workDirectionComponents,
  ...faqComponents,
  ...textSectionComponents,
  ...contactsComponents,
};
