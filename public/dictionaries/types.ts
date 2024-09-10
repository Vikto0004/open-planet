export interface RootObject {
  title: string;
  navigation: Navigation;
  footer: Footer;
}
export interface Footer {
  allRights: string;
}
export interface Navigation {
  home: string;
  courses: string;
  admin: string;
}
