import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Short-circuit OPTIONS requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: res.headers,
    });
  }

  return res;
}
