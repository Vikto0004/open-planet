import { authComponents } from "./auth/authComponents";
import { contactsComponents } from "./contacts/contactsComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { newsComponents } from "./news/newsComponents";
import { projectComponents } from "./projects/projectsComponents";
import { vacancyComponents } from "./vacancy/vacancyComponents";
import { policiesComponents } from './policies/policiesComponents'

export const components = {
  ...authComponents,
  ...helpComponents,
  ...projectComponents,
  ...newsComponents,
  ...faqComponents,
  ...contactsComponents,
  ...vacancyComponents,
  ...policiesComponents,
};
