export interface RootObject {
  title: string;
  navigation: Navigation;
  authNav: AuthNav;
  footer: Footer;
}
export interface Footer {
  allRights: string;
}
export interface AuthNav {
  [key: string]: string;
  login: string;
  registration: string;
  "forgot-password": string;
  "auth-text-login": string;
  "auth-text-registration": string;
}
export interface Navigation {
  home: string;
  courses: string;
  admin: string;
}
