// app/studio/[[...tool]]/page.tsx
'use client';

import dynamic from 'next/dynamic';
import config from '@/sanity/sanity.config';

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
