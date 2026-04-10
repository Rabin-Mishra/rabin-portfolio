"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-textMuted mr-2 font-medium hidden sm:inline-block">Share:</span>
      <Button variant="outline" size="icon" onClick={shareTwitter} className="rounded-full bg-surface w-9 h-9 border-border text-textMuted hover:text-primary">
        <Twitter className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={shareLinkedIn} className="rounded-full bg-surface w-9 h-9 border-border text-textMuted hover:text-primary">
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={handleCopy} className="rounded-full bg-surface w-9 h-9 border-border text-textMuted hover:text-primary transition-all">
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
      </Button>
    </div>
  );
}
