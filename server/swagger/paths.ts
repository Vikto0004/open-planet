import { authPaths } from "./auth/authPaths";
import { contactsPath } from "./contacts/contactsPath";
import { faqPaths } from "./faq/faqPaths";
import { textSectionPath } from "./textSection/textSectionPath";
import { projectsPaths } from "./projects/projectsPaths";

export const paths = {
  ...authPaths,
  ...projectsPaths,
  ...faqPaths,
  ...textSectionPath,
  ...contactsPath,
};
