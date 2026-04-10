import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 40%)',
            border: '8px solid #3b82f6',
            padding: '80px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '20px' }}>
             <div style={{ padding: '8px 16px', background: '#3b82f620', color: '#3b82f6', borderRadius: '8px', fontSize: 24, fontWeight: 'bold' }}>
               RM.
             </div>
          </div>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginTop: '40px',
              marginBottom: '20px',
            }}
          >
            Rabin Mishra
          </h1>
          <p
            style={{
              fontSize: 36,
              color: '#94a3b8',
              margin: 0,
            }}
          >
            DevOps Engineer · Kathmandu, Nepal
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
