"use client";

import { useEffect, useRef, useState } from "react";

const MIN_IFRAME_HEIGHT = 640;

function getDocumentHeight(iframe: HTMLIFrameElement): number {
  try {
    const doc = iframe.contentDocument;

    if (!doc) {
      return MIN_IFRAME_HEIGHT;
    }

    const docEl = doc.documentElement;
    const body = doc.body;

    // Both can be null during early load or cross-origin
    if (!docEl && !body) {
      return MIN_IFRAME_HEIGHT;
    }

    return Math.max(
      docEl?.scrollHeight ?? 0,
      docEl?.offsetHeight ?? 0,
      body?.scrollHeight ?? 0,
      body?.offsetHeight ?? 0,
      MIN_IFRAME_HEIGHT
    );
  } catch {
    // Cross-origin or security error
    return MIN_IFRAME_HEIGHT;
  }
}

export function HtmlDocumentEmbed({
  html,
  title,
}: {
  html: string;
  title: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_IFRAME_HEIGHT);

  useEffect(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    setHeight(MIN_IFRAME_HEIGHT);

    let resizeObserver: ResizeObserver | null = null;
    let frameWindow: Window | null = null;

    const updateHeight = () => {
      const nextHeight = getDocumentHeight(iframe);

      setHeight((currentHeight) =>
        Math.abs(currentHeight - nextHeight) > 4 ? nextHeight : currentHeight
      );
    };

    const handleLoad = () => {
      updateHeight();

      let doc: Document | null = null;

      try {
        doc = iframe.contentDocument;
      } catch {
        // Cross-origin — cannot access contentDocument
        return;
      }

      if (!doc) {
        return;
      }

      resizeObserver?.disconnect();
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });

      // Only observe elements that actually exist
      if (doc.documentElement) {
        resizeObserver.observe(doc.documentElement);
      }

      if (doc.body) {
        resizeObserver.observe(doc.body);
      }

      for (const image of Array.from(doc.images ?? [])) {
        if (!image.complete) {
          image.addEventListener("load", updateHeight);
        }
      }

      void doc.fonts?.ready.then(updateHeight).catch(() => {});

      frameWindow?.removeEventListener("resize", updateHeight);
      frameWindow = iframe.contentWindow;
      frameWindow?.addEventListener("resize", updateHeight);
    };

    iframe.addEventListener("load", handleLoad);

    // Delay initial call so the iframe has time to initialize
    const timer = window.setTimeout(handleLoad, 100);

    return () => {
      window.clearTimeout(timer);
      iframe.removeEventListener("load", handleLoad);
      resizeObserver?.disconnect();
      frameWindow?.removeEventListener("resize", updateHeight);

      try {
        const doc = iframe.contentDocument;

        if (!doc) {
          return;
        }

        for (const image of Array.from(doc.images ?? [])) {
          image.removeEventListener("load", updateHeight);
        }
      } catch {
        // Cross-origin cleanup — safe to ignore
      }
    };
  }, [html]);

  return (
    <div className="not-prose my-10 overflow-hidden rounded-[28px] border border-border/80 bg-surface shadow-[0_24px_80px_-56px_rgba(15,23,42,0.45)]">
      <iframe
        ref={iframeRef}
        title={title}
        srcDoc={html}
        loading="lazy"
        sandbox="allow-same-origin"
        scrolling="no"
        className="block w-full border-0 bg-transparent"
        style={{ height }}
      />
    </div>
  );
}
