export interface ContactInquiry {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt?: string;
  locale?: 'es' | 'en';
}

export type InquiryStatus = 'pending' | 'reviewed' | 'contacted' | 'archived';

export interface InquiryRecord extends ContactInquiry {
  id: string;
  status: InquiryStatus;
  receivedAt: string;
}
