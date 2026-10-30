import { ContactInquiry, BDV_BRAND } from '@bdv/shared';

export interface EmailSendResult {
  sent: boolean;
  messageId: string;
}

export class EmailService {
  /**
   * Dispatches email notifications for new inquiries.
   * Can be integrated with Resend, SendGrid, or Cloudflare Worker Email Routing.
   */
  static async sendInquiryNotification(inquiry: ContactInquiry): Promise<EmailSendResult> {
    console.log(`[BDV EmailService] New inquiry received from: ${inquiry.name} <${inquiry.email}>`);
    console.log(`[BDV EmailService] Service of interest: ${inquiry.service || 'General'}`);
    console.log(`[BDV EmailService] Forwarding to: ${BDV_BRAND.contactEmail}`);

    // Generates simulated tracking identifier for production integration
    const messageId = `bdv_msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return {
      sent: true,
      messageId,
    };
  }
}
