//interface from information
interface IInfo {
  cardTitle: string; // title "Memorandum of Cooperation"
  publicationData: string; // publication data "30 December 2024"
  link: string; // link to pdf file "/pdf/Графська Садиба.pdf", only PDF
}

//interface from input data
interface IItem {
  id: string; // elements id "1"
  en: IInfo; //en info
  ua: IInfo; // ua info
  isActive: boolean; // disabled element
}

export type DocumentsData = {
  data: Array<IItem>;
};
