"use client";

import { useEffect, useRef, useState } from "react";

const MIN_IFRAME_HEIGHT = 640;

function getDocumentHeight(iframe: HTMLIFrameElement) {
  const doc = iframe.contentDocument;

  if (!doc) {
    return MIN_IFRAME_HEIGHT;
  }

  return Math.max(
    doc.documentElement.scrollHeight,
    doc.documentElement.offsetHeight,
    doc.body?.scrollHeight ?? 0,
    doc.body?.offsetHeight ?? 0,
    MIN_IFRAME_HEIGHT
  );
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

      const doc = iframe.contentDocument;

      if (!doc) {
        return;
      }

      resizeObserver?.disconnect();
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(doc.documentElement);

      if (doc.body) {
        resizeObserver.observe(doc.body);
      }

      for (const image of Array.from(doc.images)) {
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
    handleLoad();

    return () => {
      iframe.removeEventListener("load", handleLoad);
      resizeObserver?.disconnect();
      frameWindow?.removeEventListener("resize", updateHeight);

      const doc = iframe.contentDocument;

      if (!doc) {
        return;
      }

      for (const image of Array.from(doc.images)) {
        image.removeEventListener("load", updateHeight);
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
