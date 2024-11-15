import { authComponents } from "./auth/authComponents";
import { contactsComponents } from "./contacts/contactsComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { textSectionComponents } from "./textSection/textSectionComponents";
import { projectComponents } from "./projects/projectsComponents";

export const components = {
  ...authComponents,
  ...helpComponents,
  ...projectComponents,
  ...faqComponents,
  ...textSectionComponents,
  ...contactsComponents,
};
