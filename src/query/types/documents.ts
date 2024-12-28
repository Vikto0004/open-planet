//interface from information
interface IInfo {
  cardTitle: string;
  publicationData: string;
  link: string; // link to pdf file
}

//interface from input data
interface IItem {
  id: string;
  en: IInfo;
  ua: IInfo;
}

export type DocumentsData = {
  data: Array<IItem>;
};
