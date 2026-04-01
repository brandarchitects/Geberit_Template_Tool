import { TemplateDefinition } from '@/types/template';
import { defaultData as ad01Default } from '@/components/templates/geberit-ad-01/defaultData';
import { defaultWelcomeCardData } from '@/components/templates/geberit-welcome-card/defaultData';

export const templateRegistry: Record<string, TemplateDefinition> = {
  'geberit-ad-01': {
    id: 'geberit-ad-01',
    label: 'Job Advertisement',
    format: 'A4 Portrait',
    defaultData: ad01Default,
  },
  'geberit-welcome-card': {
    id: 'geberit-welcome-card',
    label: 'Welcome Card',
    format: 'JIS B5 Landscape',
    defaultData: defaultWelcomeCardData,
  },
};

export const defaultTemplateId = 'geberit-ad-01';
