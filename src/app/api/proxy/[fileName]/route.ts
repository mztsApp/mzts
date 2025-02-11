import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { fileName: string } },
) {
  const url = req.nextUrl.searchParams.get('url');
  const { fileName } = params;

  if (!url) {
    return NextResponse.json(
      { error: 'Nie podano adresu URL' },
      { status: 400 },
    );
  }

  if (!url.startsWith('https://assets.ctfassets.net/')) {
    return NextResponse.json(
      { error: 'Niepoprawny URL Contentful' },
      { status: 400 },
    );
  }

  return NextResponse.redirect(url, {
    headers: {
      'Content-Disposition': `inline; filename="${fileName}"`,
    },
  });
}
