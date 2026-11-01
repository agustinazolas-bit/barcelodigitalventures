
import { ContactInquiry } from '@bdv/shared';
import { validateContactInquiry } from '../utils/validator';
import { EmailService } from '../services/email';
import { LeadsService } from '../services/leads';
import { AIService } from '../services/ai';
import { jsonSuccess, jsonError } from '../utils/response';

export async function handleContactSubmission(request: Request): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<ContactInquiry>;
    const validation = validateContactInquiry(body);

    if (!validation.isValid) {
      return jsonError(
        Object.values(validation.errors).join(' '),
        422,
        request
      );
    }

    const inquiry: ContactInquiry = {
      name: body.name!.trim(),
      email: body.email!.trim().toLowerCase(),
      company: body.company?.trim(),
      service: body.service?.trim(),
      budget: body.budget?.trim(),
      message: body.message!.trim(),
      locale: body.locale || 'es',
      createdAt: new Date().toISOString(),
    };

    const record = await LeadsService.recordInquiry(inquiry);
    const emailResult = await EmailService.sendInquiryNotification(inquiry);
    const aiAnalysis = AIService.analyzeProjectNeeds(
      inquiry.service || '',
      inquiry.message
    );

    return jsonSuccess(
      {
        inquiryId: record.id,
        status: 'received',
        emailDispatched: emailResult.sent,
        scopeRecommendation: aiAnalysis.suggestedScope,
      },
      'Su mensaje ha sido enviado correctamente a Barceló Digital Ventures. Nos pondremos en contacto pronto.',
      200,
      request
    );
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : 'Error procesando solicitud de contacto';

    return jsonError(message, 500, request);
  }
}

