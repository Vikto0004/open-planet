import { authComponents } from "./auth/authComponents";
import { contactsComponents } from "./contacts/contactsComponents";
import { faqComponents } from "./faq/faqComponents";
import { helpComponents } from "./helpComponents";
import { newsComponents } from "./news/newsComponents";
import { projectComponents } from "./projects/projectsComponents";
import { tendersComponets } from "./tenders/tendersComponents";
import { vacancyComponents } from "./vacancy/vacancyComponents";

export const components = {
  ...authComponents,
  ...helpComponents,
  ...projectComponents,
  ...newsComponents,
  ...faqComponents,
  ...contactsComponents,
  ...vacancyComponents,
  ...tendersComponets,
};
