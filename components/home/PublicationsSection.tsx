import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink, FileDown } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getFeaturedPublications } from "@/sanity/lib/queries";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SanityPublication } from "@/lib/types";

export async function PublicationsSection() {
  const publications = await client.fetch<SanityPublication[]>(getFeaturedPublications);

  if (!publications || publications.length === 0) return null;

  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              Featured Publications
            </h2>
            <p className="text-textMuted max-w-2xl">
              Research papers, academic publications, and technical documents I have authored or co-authored.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {publications.slice(0, 4).map((pub) => (
            <Card key={pub._id} className="h-full flex flex-col bg-surface hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 relative border-border">
              <CardContent className="p-6 flex flex-col flex-1 h-full">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-textMuted font-mono mb-3">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium truncate max-w-[150px]">
                    {pub.venue}
                  </span>
                  <span>•</span>
                  <span>{pub.publishedDate}</span>
                </div>

                <h3 className="text-base font-bold text-textPrimary mb-2 leading-snug hover:text-primary transition-colors line-clamp-2 min-h-[3rem] flex items-center">
                  {pub.paperUrl ? (
                    <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </h3>

                <p className="text-xs font-semibold text-textMuted mb-3 italic line-clamp-1">
                  {pub.authors}
                </p>

                {pub.abstract && (
                  <p className="text-textMuted text-xs mb-5 leading-relaxed line-clamp-3 flex-1">
                    {pub.abstract}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-center gap-2">
                  {pub.paperUrl && (
                    <Button asChild size="sm" variant="outline" className="rounded-full bg-background text-[11px] h-8 px-3">
                      <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer">
                        Publisher Link <ExternalLink className="w-3 h-3 ml-1.5" />
                      </a>
                    </Button>
                  )}
                  {pub.pdfFileUrl && (
                    <Button asChild size="sm" className="rounded-full shadow-md shadow-primary/15 text-[11px] h-8 px-3">
                      <a href={`${pub.pdfFileUrl}?dl=Rabin_Mishra_Publication.pdf`} download rel="noopener noreferrer">
                        Download PDF <FileDown className="w-3 h-3 ml-1.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full bg-surface border-border">
            <Link href="/publications">
              View All Publications <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
