import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/Card";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="space-y-4 text-lg">
        <Card className="hover:border-primary/50 transition-colors group bg-surface">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-textMuted font-medium mb-1">Email</p>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-textPrimary font-semibold hover:text-primary transition-colors flex items-center gap-2">
                {SOCIAL_LINKS.email} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors group bg-surface">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-textMuted font-medium mb-1">Phone</p>
              <a href={`tel:+9779824059780`} className="text-textPrimary font-semibold hover:text-primary transition-colors flex items-center gap-2">
                +977-9824059780 <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors group bg-surface">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-textMuted font-medium mb-1">Location</p>
              <a href="https://maps.google.com/?q=Kathmandu,Nepal" target="_blank" rel="noopener noreferrer" className="text-textPrimary font-semibold hover:text-primary transition-colors flex items-center gap-2">
                Kathmandu, Nepal <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-textMuted mb-4">Connect everywhere</h3>
        <div className="flex items-center gap-4">
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface hover:bg-surface-2 border border-border rounded-lg text-textPrimary hover:text-primary transition-all hover:scale-105 flex items-center gap-2 font-medium">
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-surface hover:bg-surface-2 border border-border rounded-lg text-textPrimary hover:text-primary transition-all hover:scale-105 flex items-center gap-2 font-medium">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
