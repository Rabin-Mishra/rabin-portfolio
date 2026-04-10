import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { slugify } from '@/lib/utils';
import { ShareButtons } from './ShareButtons'; // Used locally

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8 rounded-xl overflow-hidden border border-border bg-surface-2 p-1 relative">
          <div className="relative aspect-[16/9]">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || ' '}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-textMuted mt-3 mb-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      const { code, language, filename } = value;
      return (
        <div className="my-8 rounded-xl overflow-hidden border border-border bg-[#0d1117] shadow-xl text-left">
          <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs text-textMuted font-mono font-medium">{filename || 'Terminal'}</span>
            </div>
            {language && (
              <span className="text-[10px] uppercase font-bold text-primary/70 bg-primary/10 px-2 py-0.5 rounded">
                {language}
              </span>
            )}
          </div>
          <div className="relative">
             <div className="text-sm font-mono overflow-x-auto p-4 custom-scrollbar text-[#c9d1d9] leading-relaxed">
               <pre><code>{code}</code></pre>
             </div>
          </div>
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => {
      const text = children?.length ? children.map((c: any) => typeof c === 'string' ? c : c.props?.text || '').join('') : '';
      const id = slugify(text) || Math.random().toString();
      return <h2 id={id} className="text-3xl font-bold mt-12 mb-6 text-textPrimary group scroll-mt-24">{children}</h2>;
    },
    h3: ({ children }: any) => {
      const text = children?.length ? children.map((c: any) => typeof c === 'string' ? c : c.props?.text || '').join('') : '';
      const id = slugify(text) || Math.random().toString();
      return <h3 id={id} className="text-2xl font-bold mt-8 mb-4 text-textPrimary group scroll-mt-24">{children}</h3>;
    },
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-1 my-6 italic text-textMuted bg-surface p-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-6 text-textMuted leading-relaxed text-lg">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value?.href?.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={value?.href} rel={rel} target={target} className="text-primary font-medium hover:text-secondary underline underline-offset-4 decoration-primary/30 transition-colors">
          {children}
          {target === '_blank' && (
            <span className="inline-block ml-1 opacity-50 text-[0.8em]">↗</span>
          )}
        </a>
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="prose prose-invert max-w-none pt-4">
      <PortableText value={value} components={components} />
    </div>
  );
}
