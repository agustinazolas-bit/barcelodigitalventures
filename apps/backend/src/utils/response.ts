import { ApiResponse } from '@bdv/shared';
import { corsHeaders } from './cors';

export function jsonResponse<T>(data: ApiResponse<T>, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

export function jsonSuccess<T>(data: T, message?: string, status = 200): Response {
  return jsonResponse<T>(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    status
  );
}

export function jsonError(errorMessage: string, status = 400): Response {
  return jsonResponse<null>(
    {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    },
    status
  );
}
