import { draftMode } from "next/headers";
import Link from "next/link";

export async function PreviewBanner() {
  let isDraft = false;
  try {
    const draft = await draftMode();
    isDraft = draft.isEnabled;
  } catch {
    // Fail-safe outside of request context (e.g. build time)
  }

  if (!isDraft) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm font-semibold text-yellow-600 shadow-lg backdrop-blur-md dark:text-yellow-400">
      <span>Preview Mode Active</span>
      <Link
        href="/api/draft/disable"
        className="rounded bg-yellow-600 px-2.5 py-1 text-xs text-white hover:bg-yellow-500 transition-colors"
      >
        Exit Preview
      </Link>
    </div>
  );
}
