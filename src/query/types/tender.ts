type Content =
  | string
  | string[]
  | {
      id: string;
      url: string;
    };

enum SectionType {
  "title",
  "subtitle",
  "paragraph",
  "imageList",
}

//interface from tender information
interface ITender {
  sectionType: SectionType;
  content: Content;
}

//interface from information
interface IInfo {
  cardTitle: string; // title "Title of the Requests for proposals"
  cardSubTitle: string; // subTitle "tender"
  publicationData: string; // publication data "01 January 2025"
  relevant: string; // relevant until "23.03.2025"
  info: Array<ITender>;
}

//interface from input data
interface IItem {
  id: string; // elements id "1"
  en: IInfo; //en info
  ua: IInfo; // ua info
  isActive: boolean; // active/disabled element, default: true
}

export type DocumentsData = {
  data: Array<IItem>;
};
