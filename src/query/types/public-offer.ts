export type Node = {
  tag: string;
  className?: string;
  style?: string;
  text?: string;
  content?: string;
  children?: Node[];
};

export type PublicOfferBlock = {
  tag: string;
  className?: string;
  children: Node[];
};

export type PublicOfferData = {
  ua: {
    title: string;
    subtitle?: string;
    blocks: PublicOfferBlock[];
  };
  en: {
    title: string;
    subtitle?: string;
    blocks: PublicOfferBlock[];
  };
};
