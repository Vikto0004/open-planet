import { authComponents } from "./auth/authComponents";
import { contactsComponents } from "./contacts/contactsComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { projectComponents } from "./projects/projectsComponents";
import { newsComponents } from "./news/newsComponents";

export const components = {
  ...authComponents,
  ...helpComponents,
  ...projectComponents,
  ...newsComponents,
  ...faqComponents,
  ...contactsComponents,
};
