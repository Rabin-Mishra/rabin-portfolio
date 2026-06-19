import { Metadata } from "next";
import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { SanityPublication } from "@/lib/types";
import { PublicationsList } from "@/components/publications/PublicationsList";
import { getAllPublications } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Publications | Rabin Mishra",
  description: "Browse academic research papers, publications, and technical documents authored or co-authored by Rabin Mishra.",
};

export default async function PublicationsPage() {
  const publications = await client.fetch<SanityPublication[]>(getAllPublications);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-8 lg:py-20">
      <section className="mb-10 overflow-hidden rounded-[32px] border border-border/70 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_34%),linear-gradient(180deg,rgba(248,250,252,0.9),rgba(255,255,255,0.82))] px-6 py-8 shadow-[0_28px_90px_-60px_rgba(15,23,42,0.45)] md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-textMuted">
              Research
            </p>
            <h1 className="font-editorial text-4xl font-semibold tracking-[-0.04em] text-textPrimary md:text-6xl">
              Academic Papers & Publications
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-textMuted md:text-lg">
              Explore my academic research, technical publications, and study papers covering MLOps pipelines, containerized system architectures, and network automation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4 backdrop-blur">
              <div className="text-2xl font-bold text-textPrimary">{publications.length}</div>
              <div className="mt-1 text-sm text-textMuted">Total Papers</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4 backdrop-blur">
              <div className="text-2xl font-bold text-textPrimary">IEEE & More</div>
              <div className="mt-1 text-sm text-textMuted">Indexed Venues</div>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-4 backdrop-blur">
              <div className="text-2xl font-bold text-textPrimary">Open</div>
              <div className="mt-1 text-sm text-textMuted">PDFs Verifiable</div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-20 text-center animate-pulse text-textMuted">Loading publications...</div>}>
        <PublicationsList publications={publications} />
      </Suspense>
    </div>
  );
}
