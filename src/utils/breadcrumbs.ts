import * as links from "./routes";

export const breadcrumbsValue: {
  [key: string]: {
    title: string;
    href?: string;
    id?: string;
  }[];
} = {
  ["/"]: [{ title: "home", href: "/" }],
  ["/payment-by-card"]: [
    { title: "cooperationFund.title" },
    { title: "cooperationFund.supportFund", href: links.support },
  ],
  ["/lignes-of-work"]: [
    { title: "workDirections.title", href: links.programs },
    { title: "workDirections.medecine", id: "medecine" },
    { title: "workDirections.electric", id: "electric" },
    { title: "workDirections.education", id: "education" },
    { title: "workDirections.restoration", id: "restoration" },
    { title: "workDirections.culture", id: "culture" },
  ],
  ["/news"]: [{ title: "news", href: links.news }],
  ["/reports"]: [{ title: "reports", href: links.reports }],
};

export const URLParams = [
  "medecine",
  "electric",
  "education",
  "restoration",
  "culture",
];
