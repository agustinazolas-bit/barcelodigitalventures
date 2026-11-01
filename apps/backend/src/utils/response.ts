
import { ApiResponse } from '@bdv/shared';
import { getCorsHeaders } from './cors';

export function jsonResponse<T>(
  data: ApiResponse<T>,
  status = 200,
  request?: Request
): Response {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  if (request) {
    getCorsHeaders(request).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  return new Response(JSON.stringify(data), {
    status,
    headers,
  });
}

export function jsonSuccess<T>(
  data: T,
  message?: string,
  status = 200,
  request?: Request
): Response {
  return jsonResponse<T>(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    status,
    request
  );
}

export function jsonError(
  errorMessage: string,
  status = 400,
  request?: Request
): Response {
  return jsonResponse<null>(
    {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    },
    status,
    request
  );
}
