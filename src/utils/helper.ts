// export function isValidLang(lang: string | string[]): "ua" | "en" {
//   const validLang = Array.isArray(lang) ? lang[0] : lang;
//   if (validLang === "en" || validLang === "ua") {
//     return validLang;
//   } else {
//     return "en";
//   }
// }

// import { useState, useEffect } from "react";

// export function useMediaQuery(query: string): boolean {
//   const [matches, setMatches] = useState<boolean>(false);

//   useEffect(() => {
//     const media = window.matchMedia(query);
//     if (media.matches !== matches) setMatches(media.matches);

//     const listener = () => setMatches(media.matches);
//     media.addEventListener("change", listener);
//     return () => media.removeEventListener("change", listener);
//   }, [matches, query]);

//   return matches;
// }
