import { handleOptions } from './utils/cors';
import { jsonError } from './utils/response';
import { handleHealthCheck, handleContactSubmission, handleGetServices } from './routes';

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
    if (path === '/' || path === '/health' || path === '/api/health') {
      return handleHealthCheck();
    }

    // Contact form submission endpoint
    if ((path === '/api/contact' || path === '/contact') && method === 'POST') {
      return handleContactSubmission(request);
    }

    // Services / capabilities directory endpoint
    if (path === '/api/services' && method === 'GET') {
      return handleGetServices();
    }

    // Fallback 404
    return jsonError(`Ruta no encontrada: ${method} ${path}`, 404);
  },
};
