const home = "/";
const joinUs = "/join-us";
const requests = "/details-of-tenders";
const programs = "/lignes-of-work";

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
        textForTranslate: "pages.joinUs",
      },
      {
        link: requests,
        textForTranslate: "pages.requests",
      },
      {
        link: support,
        textForTranslate: "pages.support",
      },
    ],
    anotherNav: [
      {
        link: programs,
        textForTranslate: "pages.programs",
      },
      {
        link: news,
        textForTranslate: "pages.news",
      },
      {
        link: reports,
        textForTranslate: "pages.reports",
      },
    ],
    facebook,
    instagram,
    support,
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
        textForTranslate: "pages.publicOffer",
      },
      {
        link: publicReceiving,
        textForTranslate: "pages.publicReceiving",
      },
      {
        link: privacyPolicy,
        textForTranslate: "pages.privacyPolicy",
      },
    ],
    support,
  },
};

export default links;
