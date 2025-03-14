import * as links from "./routes";

export const breadcrumbsValue: {
  [key: string]: {
    title: string;
    href?: string;
    id?: string;
    translate: boolean;
  }[];
} = {
  ["/"]: [{ title: "home", href: "/", translate: true }],
  ["/payment-by-card"]: [
    { title: "cooperationFund.title", translate: true },
    {
      title: "cooperationFund.supportFund",
      href: links.support,
      translate: true,
    },
  ],
  ["/join-us"]: [
    { title: "cooperationFund.title", translate: true },
    {
      title: "cooperationFund.joinTeam",
      href: links.joinUs,
      translate: true,
    },
  ],
  ["/details-of-tenders"]: [
    { title: "cooperationFund.title", translate: true },
    {
      title: "cooperationFund.requestsOffers",
      href: links.requests,
      translate: true,
    },
  ],
  ["/programs"]: [
    { title: "workDirections.title", href: links.programs, translate: true },
    { title: "workDirections.medecine", id: "medicine", translate: true },
    { title: "workDirections.electric", id: "electric", translate: true },
    {
      title: "workDirections.education",
      href: links.education,
      id: "education",
      translate: true,
    },
    { title: "workDirections.restoration", id: "restoration", translate: true },
    { title: "workDirections.culture", id: "culture", translate: true },
  ],
  ["/news"]: [{ title: "news", href: links.news, translate: true }],
  ["/reports"]: [{ title: "reports", href: links.reports, translate: true }],
  ["/public-offer-charity"]: [
    {
      title: "publicReceiving",
      href: links.publicReceiving,
      translate: true,
    },
  ],
  ["/public-offer"]: [
    {
      title: "publicOffer",
      href: links.publicOffer,
      translate: true,
    },
  ],
  ["/privacy-policy"]: [
    {
      title: "privacyPolicy",
      href: links.privacyPolicy,
      translate: true,
    },
  ],
  ["/documents"]: [
    {
      title: "documents",
      href: links.documents,
      translate: true,
    },
  ],
};

export const URLParams = [
  "medecine",
  "electric",
  "education",
  "restoration",
  "culture",
];
