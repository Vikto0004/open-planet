export type Node = {
  _id?: string;
  tag: string;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  content?: string;
  children?: Node[];
};

export type PublicOfferBlock = {
  tag: string;
  className?: string;
  children?: Node[]; // Пізніше прийняти це - ?
};

export type PublicOfferData = {
  ua: {
    title: string;
    subtitle?: string;
    blocks: PublicOfferBlock[];
  } | null;
  en: {
    title: string;
    subtitle?: string;
    blocks: PublicOfferBlock[];
  } | null;
};
