const home = "";
const joinUs = "/join-us";
const requests = "/details-of-tenders";
const programs = "/programs";

const news = "/news";
const reports = "/reports";
const support = "/payment-by-card";

const publicOffer = "/public-offer";
const publicReceiving = "/public-offer-charity";
const privacyPolicy = "/privacy-policy";

const facebook = "https://www.facebook.com/openplanet.ua";
const instagram = "https://www.instagram.com/_v_i_t_o_k__/";

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
