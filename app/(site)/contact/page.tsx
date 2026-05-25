import { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { client } from "@/sanity/lib/client";
import { getSiteConfig } from "@/sanity/lib/queries";
import { SanitySiteConfig } from "@/lib/types";

export const metadata: Metadata = {
  title: "Contact Me | Rabin Mishra",
  description: "Get in touch for DevOps roles, freelance projects, technical collaborations, or just to say hi.",
};

export default async function ContactPage() {
  const config = await client.fetch<SanitySiteConfig | null>(getSiteConfig);

  const headline = config?.contactHeadline ?? "Let's Work Together";
  const description = config?.contactDescription ?? "I'm open to DevOps roles, internships, freelance projects, and technical collaborations. Based in Kathmandu, Nepal — available for remote work globally.";

  return (
    <div className="container mx-auto px-4 md:px-8 py-12 lg:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-textPrimary">
          {headline}
        </h1>
        <p className="text-lg text-textMuted leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <ContactInfo config={config} />
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
