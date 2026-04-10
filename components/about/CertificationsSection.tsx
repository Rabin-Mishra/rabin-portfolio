import { client } from "@/sanity/lib/client";
import { getCertifications } from "@/sanity/lib/queries";
import { CertificationsSectionClient } from "./CertificationsSectionClient";
import { SanityCertification } from "@/lib/types";

export async function CertificationsSection() {
  const certs = await client.fetch<SanityCertification[]>(getCertifications);
  return <CertificationsSectionClient certs={certs} />;
}
