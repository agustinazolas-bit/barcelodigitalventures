export interface AIAnalysisResult {
  suggestedScope: string;
  recommendedStack: string[];
  priority: 'standard' | 'high' | 'strategic';
}

export class AIService {
  /**
   * Evaluates project requirements and generates preliminary architecture suggestions.
   */
  static analyzeProjectNeeds(serviceKey: string, message: string): AIAnalysisResult {
    const isEnterprise = /enterprise|empresa|corporativ|gran escala/i.test(message);
    const isAI = /inteligencia artificial|ia|llm|machine learning|automatiz/i.test(message) || serviceKey.includes('ai');

    return {
      suggestedScope: isEnterprise
        ? 'Arquitectura empresarial escalable y consultoría estratégica'
        : 'Desarrollo ágil de producto MVP a producción',
      recommendedStack: isAI
        ? ['TypeScript', 'Cloudflare Workers', 'Gemini Models', 'Vector DB', 'React']
        : ['TypeScript', 'React', 'Tailwind CSS', 'Serverless APIs'],
      priority: isEnterprise ? 'strategic' : 'high',
    };
  }
}
