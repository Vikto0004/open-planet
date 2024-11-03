export const home = "/";
export const joinUs = "/join-us";
export const requests = "/details-of-tenders";
export const programs = "/programs";

export const news = "/news";
export const reports = "/reports";
export const support = "/payment-by-card";

export const documents = "/documents";
export const publicOffer = "/public-offer";
export const publicReceiving = "/public-offer-charity";
export const privacyPolicy = "/privacy-policy";

export const medecine = programs + "/medecine";
export const restoration = programs + "/restoration";
export const education = programs + "/education";
export const electric = programs + "/electric";
export const culture = programs + "/culture";

export const facebook = "https://www.facebook.com/openplanet.ua";
export const instagram = "https://www.instagram.com/_v_i_t_o_k__/";

export const programQueryParam = "program";

const links = {
  Header: {
    home,
    cooperation: [
      {
        link: joinUs,
        textForTranslate: "joinTeam",
      },
      {
        link: requests,
        textForTranslate: "requestsOffers",
      },
      {
        link: support,
        textForTranslate: "helpFund",
      },
    ],
    programs: [
      {
        link: medecine,
        textForTranslate: "medical",
      },
      {
        link: restoration,
        textForTranslate: "reconstruction",
      },
      {
        link: education,
        textForTranslate: "education",
      },
      {
        link: electric,
        textForTranslate: "energy",
      },
      {
        link: culture,
        textForTranslate: "cultural",
      },
    ],
    anotherNav: [
      {
        link: news,
        textForTranslate: "news",
      },
      {
        link: reports,
        textForTranslate: "reports",
      },
    ],
    facebook,
    instagram,
    support,
  },
  DirectionsWork: {
    allPrograms: programs,
  },
  Footer: {
    pages: [
      {
        link: home,
        textForTranslate: "pages.home",
      },
      {
        link: programs,
        textForTranslate: "pages.programs",
      },
      {
        link: joinUs,
        textForTranslate: "pages.joinUs",
      },
      {
        link: requests,
        textForTranslate: "pages.requests",
      },
      {
        link: news,
        textForTranslate: "pages.news",
      },
      {
        link: support,
        textForTranslate: "pages.support",
      },
      {
        link: reports,
        textForTranslate: "pages.reports",
      },
    ],
    information: [
      {
        link: documents,
        textForTranslate: "information.documents",
      },
      {
        link: publicOffer,
        textForTranslate: "information.publicOffer",
      },
      {
        link: publicReceiving,
        textForTranslate: "information.publicReceiving",
      },
      {
        link: privacyPolicy,
        textForTranslate: "information.privacyPolicy",
      },
    ],
    support,
  },
};

export default links;
