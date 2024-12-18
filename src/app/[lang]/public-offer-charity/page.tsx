import FAQ from "@/core/FAQ/FAQ";
import PublicOffer from "@/core/PublicOffer/PublicOffer";
import publicReceiving from "@/db-local/public-receiving.json";

export default async function publicOfferCharity() {
  return (
    <>
      <PublicOffer data={publicReceiving} />
      <FAQ />
    </>
  );
}
