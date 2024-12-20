import FAQ from "@/core/FAQ/FAQ";
import PublicOffer from "@/core/PublicOffer/PublicOffer";
import privacyPolicyData from "@/db-local/privacy-policy.json";

export default async function PrivacyPolicy() {
  return (
    <>
      <PublicOffer data={privacyPolicyData} />
      <FAQ />
    </>
  );
}
