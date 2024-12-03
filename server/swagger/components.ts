import { authComponents } from "./auth/authComponents";
import { contactsComponents } from "./contacts/contactsComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { projectComponents } from "./projects/projectsComponents";

export const components = {
  ...authComponents,
  ...helpComponents,
  ...projectComponents,
  ...faqComponents,
  ...contactsComponents,
};
