import { ContactInquiry, InquiryRecord } from '@bdv/shared';

export class LeadsService {
  /**
   * Persists or formats a new incoming lead record.
   */
  static async recordInquiry(inquiry: ContactInquiry): Promise<InquiryRecord> {
    const record: InquiryRecord = {
      ...inquiry,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: 'pending',
      receivedAt: new Date().toISOString(),
    };

    return record;
  }
}
