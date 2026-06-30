// app/studio/[[...tool]]/page.tsx
'use client';

import dynamic from 'next/dynamic';
import config from '@/sanity/sanity.config';

// Next.js 15 dev mode aggressively intercepts console.error and crashes the UI.
// This overrides console.error to suppress harmless third-party React 18/19 compatibility warnings.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('validateFragmentProps') ||
       message.includes('React does not recognize') ||
       message.includes('Warning:') ||
       message.includes('Invalid prop') ||
       message.includes('unique "key" prop') ||
       message.includes('Each child in a list') ||
       message.includes('An empty string ("") was passed'))
    ) {
      return;
    }
    originalError(...args);
  };
}

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-slate-300">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-sm">Loading Sanity Studio...</p>
        </div>
      </div>
    ),
  }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
