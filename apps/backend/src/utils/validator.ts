import { ContactInquiry } from '@bdv/shared';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactInquiry(body: Partial<ContactInquiry>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.name = 'El nombre es obligatorio y debe tener al menos 2 caracteres.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!body.email || typeof body.email !== 'string' || !emailRegex.test(body.email)) {
    errors.email = 'Debe proporcionar un correo electrónico válido.';
  }

  if (!body.message || typeof body.message !== 'string' || body.message.trim().length < 10) {
    errors.message = 'El mensaje debe contener al menos 10 caracteres.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
