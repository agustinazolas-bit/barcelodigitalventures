
import { handleOptions } from './utils/cors';
import { jsonError } from './utils/response';
import { handleHealthCheck, handleGetServices } from './routes';

export interface Env {
  ENVIRONMENT?: string;
  APP_NAME?: string;
}

export default {
  async fetch(request: Request, env?: Env, ctx?: unknown): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method.toUpperCase();

    // CORS preflight requests
    if (method === 'OPTIONS') {
      return handleOptions(request);
    }

    // Health check endpoint
    if (
      (path === '/' || path === '/health' || path === '/api/health') &&
      method === 'GET'
    ) {
      return handleHealthCheck(request);
    }

    // Services directory endpoint
    if (path === '/api/services' && method === 'GET') {
      return handleGetServices(request);
    }

    // Fallback 404
    return jsonError(
      `Ruta no encontrada: ${method} ${path}`,
      404,
      request
    );
  },
};
