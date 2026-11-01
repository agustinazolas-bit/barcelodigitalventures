
const allowedOrigins = [
  'https://barcelodigitalventures.cl',
  'https://www.barcelodigitalventures.cl',
];

export function getCorsHeaders(request: Request): Headers {
  const origin = request.headers.get('Origin');
  const headers = new Headers();

  if (origin && allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Vary', 'Origin');
  }

  headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS'
  );

  headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  headers.set('Access-Control-Max-Age', '86400');

  return headers;
}

export function handleOptions(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request),
  });
}
