import { authPaths } from "./auth/authPaths";
import { contactsPath } from "./contacts/contactsPath";
import { faqPaths } from "./faq/faqPaths";
import { projectsPaths } from "./projects/projectsPaths";
import { newsPaths } from "./news/newsPaths";

export const paths = {
  ...authPaths,
  ...projectsPaths,
  ...newsPaths,
  ...faqPaths,
  ...contactsPath,
};
