import { authPaths } from "./auth/authPaths";
import { contactsPath } from "./contacts/contactsPath";
import { faqPaths } from "./faq/faqPaths";
import { projectsPaths } from "./projects/projectsPaths";

export const paths = {
  ...authPaths,
  ...projectsPaths,
  ...faqPaths,
  ...contactsPath,
};
