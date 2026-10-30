export interface ServiceOffering {
  id: string;
  key: 'ai' | 'digitalProducts' | 'cloud' | 'transformation' | 'cybersecurity' | 'consulting';
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  category: 'core' | 'specialized' | 'enterprise';
}
