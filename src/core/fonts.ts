import { Playfair_Display, Inter, Montserrat } from "@next/font/google";

// all weights will be correct
export const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["cyrillic"],
  display: "swap",
});

export const inter = Inter({
  weight: ["400"],
  style: ["normal"],
  subsets: ["cyrillic"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: ["400"],
  style: ["normal"],
  subsets: ["cyrillic"],
  display: "swap",
});
