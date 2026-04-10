import Image from "next/image";
import { MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function AboutHero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-6">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full p-2 border-2 border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-surface-2 relative">
                <Image
                  src="/profile.jpeg"
                  alt="Rabin Mishra"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-textPrimary mb-2">Rabin Mishra</h1>
              <p className="text-lg text-primary font-medium mb-4">IT Engineer | Aspiring DevOps</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1 bg-surface">
                  <MapPin className="w-3 h-3" /> Kathmandu, Nepal
                </Badge>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-primary" />
              About Me
            </h2>
            <div className="space-y-6 text-lg text-textMuted leading-relaxed">
              <p>
                I&apos;m Rabin Mishra, an IT Engineer and aspiring DevOps professional based in Kathmandu, Nepal. I recently completed my Bachelor of Engineering in Information Technology at Pokhara University with a 3.9 GPA.
              </p>
              <p>
                I&apos;m passionate about building and automating cloud infrastructure, designing reliable CI/CD pipelines, and applying DevOps best practices to real-world systems. I&apos;m a registered engineer under the Nepal Engineering Council and actively building my skills across AWS, Docker, Terraform, Kubernetes, and Linux.
              </p>
              <p>
                My philosophy is that good infrastructure should be invisible but resilient — allowing software to scale effortlessly while minimizing human operational overhead.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
