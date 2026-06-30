import React, { useState, useEffect } from 'react'

export interface IframePreviewProps {
  document: {
    displayed: {
      slug?: { current?: string }
      _type: string
      title?: string
    }
  }
}

export default function IframePreview({ document }: IframePreviewProps) {
  const { displayed } = document
  const slug = displayed.slug?.current
  const type = displayed._type

  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    if (!slug) return

    // Dynamic base URL resolution
    let baseUrl = 'https://rabinmishra.com.np'
    if (typeof window !== 'undefined') {
      const { hostname, port, origin } = window.location
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // If running standalone studio (default port 3333), fallback to dev port 3000
        // Otherwise (embedded studio), use the current page origin (handles port 3000, 3001, 3002, etc.)
        baseUrl = port === '3333' ? 'http://localhost:3000' : origin
      }
    }

    const secret = 'preview-secret-123' // Fallback preview secret matching route.ts
    const url = `${baseUrl}/api/draft/preview?secret=${secret}&slug=${slug}&type=${type}`
    setPreviewUrl(url)
  }, [slug, type])

  if (!slug) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#666' }}>
        <h3>Please enter a title and generate a slug first to see the preview.</h3>
      </div>
    )
  }

  if (!previewUrl) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif', color: '#666' }}>
        <h3>Generating preview URL...</h3>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '0.5rem 1rem',
          background: '#f4f4f5',
          borderBottom: '1px solid #e4e4e7',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.8rem',
          fontFamily: 'sans-serif',
          color: '#71717a'
        }}
      >
        <span>
          Preview URL:{' '}
          <code style={{ background: '#e4e4e7', padding: '0.2rem 0.4rem', borderRadius: '4px', wordBreak: 'break-all' }}>
            {previewUrl}
          </code>
        </span>
        <button
          onClick={() => {
            const iframe = window.document.getElementById('preview-iframe') as HTMLIFrameElement
            if (iframe) iframe.src = iframe.src
          }}
          style={{
            padding: '0.3rem 0.75rem',
            background: '#ffffff',
            border: '1px solid #d4d4d8',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            color: '#18181b',
            whiteSpace: 'nowrap',
            marginLeft: '10px'
          }}
        >
          Refresh
        </button>
      </div>
      <iframe
        id="preview-iframe"
        src={previewUrl}
        style={{ width: '100%', height: '100%', border: 'none', background: '#ffffff' }}
        title="Live Preview"
      />
    </div>
  )
}
