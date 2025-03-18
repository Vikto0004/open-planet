import { authPaths } from "./auth/authPaths";
import { contactsPath } from "./contacts/contactsPath";
import { faqPaths } from "./faq/faqPaths";
import { newsPaths } from "./news/newsPaths";
import { projectsPaths } from "./projects/projectsPaths";
import { tendersPaths } from "./tenders/tendersPaths";
import { vacancyPaths } from "./vacancy/vacancyPaths";
import { policiesPaths } from "./policies/policiesPaths"

export const paths = {
  ...authPaths,
  ...projectsPaths,
  ...policiesPaths,
  ...newsPaths,
  ...faqPaths,
  ...contactsPath,
  ...vacancyPaths,
  ...tendersPaths,
};
