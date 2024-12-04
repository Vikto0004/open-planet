import FAQ from "@/core/FAQ/FAQ";
import PublicOffer from "@/core/PublicOffer/PublicOffer";

export default async function PublicOfferCharityPage() {
  return (
    <>
      <PublicOffer receiving={true} />
      <FAQ />
    </>
  );
}
