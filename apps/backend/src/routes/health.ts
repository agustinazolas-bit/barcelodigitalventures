import { HealthCheckResponse } from '@bdv/shared';
import { jsonSuccess } from '../utils/response';

export function handleHealthCheck(): Response {
  const data: HealthCheckResponse = {
    status: 'ok',
    service: 'Barceló Digital Ventures API',
    version: '1.0.0',
    environment: 'production',
    timestamp: new Date().toISOString(),
  };

  return jsonSuccess(data, 'BDV API operational');
}
