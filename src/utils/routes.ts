export const home = "";
export const joinUs = "/join-us";
export const requests = "/details-of-tenders";
export const programs = "/programs";

export const news = "/news";
export const reports = "/reports";
export const support = "/payment-by-card";

export const publicOffer = "/public-offer";
export const publicReceiving = "/public-offer-charity";
export const privacyPolicy = "/privacy-policy";

export const facebook = "https://www.facebook.com/openplanet.ua";
export const instagram = "https://www.instagram.com/_v_i_t_o_k__/";

const links = {
  Header: {
    home,
    cooperation: [
      {
        link: joinUs,
        textForTranslate: "cooperationFund.joinTeam",
      },
      {
        link: requests,
        textForTranslate: "cooperationFund.requestsOffers",
      },
      {
        link: support,
        textForTranslate: "cooperationFund.helpFund",
      },
    ],
    anotherNav: [
      {
        link: programs,
        textForTranslate: "directionsWork",
      },
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

export const programQueryParam = "program";

export default links;
