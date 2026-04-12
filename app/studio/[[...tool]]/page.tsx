'use client'

import NextDynamic from 'next/dynamic'
import config from '@/sanity/sanity.config'

export const dynamic = 'force-dynamic'

const NextStudio = NextDynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'center',
        height:'100vh', background:'#0a0a0a', color:'#f1f5f9',
        fontFamily:'Inter, sans-serif', fontSize:'16px'
      }}>
        Loading Studio...
      </div>
    ),
  }
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
