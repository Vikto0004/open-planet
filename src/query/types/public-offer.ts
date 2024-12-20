export type Node = {
  tag: string;
  className?: string;
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
  } | null;
  en: {
    title: string;
    subtitle?: string;
    blocks: PublicOfferBlock[];
  } | null;
};
