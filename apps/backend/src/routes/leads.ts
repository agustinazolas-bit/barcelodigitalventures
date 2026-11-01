
import { jsonSuccess } from '../utils/response';
import { BDV_BRAND } from '@bdv/shared';

export function handleGetServices(request: Request): Response {
  return jsonSuccess(
    {
      company: BDV_BRAND.name,
      tagline: BDV_BRAND.tagline,
      services: [
        {
          id: 'ai-development',
          title: 'Desarrollo de Inteligencia Artificial',
          desc: 'Agentes inteligentes, modelos LLM personalizados y flujos autónomos.',
        },
        {
          id: 'custom-software',
          title: 'Software a Medida & SaaS',
          desc: 'Plataformas web y móviles con arquitectura de alto rendimiento.',
        },
        {
          id: 'cloud-architecture',
          title: 'Arquitectura Cloud & DevOps',
          desc: 'Infraestructuras serverless y edge computing sin fricción.',
        },
      ],
    },
    'Lista de capacidades de Barceló Digital Ventures',
    200,
    request
  );
}
