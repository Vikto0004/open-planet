import FAQ from "@/core/FAQ/FAQ";
import PublicOffer from "@/core/PublicOffer/PublicOffer";
import publicOfferData from "@/db-local/public-offer.json";

export default async function PublicOfferPage() {
  return (
    <>
      <PublicOffer data={publicOfferData} />
      <FAQ />
    </>
  );
}
