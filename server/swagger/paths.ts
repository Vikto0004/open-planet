import { authPaths } from "./auth/authPaths";
import { contactsPath } from "./contacts/contactsPath";
import { faqPaths } from "./faq/faqPaths";
import { textSectionPath } from "./textSection/textSectionPath";
import { workDirectionPaths } from "./workDirection/workDirectionPaths";

export const paths = {
  ...authPaths,
  ...workDirectionPaths,
  ...faqPaths,
  ...textSectionPath,
  ...contactsPath,
};
