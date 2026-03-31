import { TemplateDefinition } from '@/types/template';
import { defaultData } from '@/components/templates/geberit-ad-01/defaultData';

export const templateRegistry: Record<string, TemplateDefinition> = {
  'geberit-ad-01': {
    id: 'geberit-ad-01',
    label: 'Job Advertisement (A4)',
    defaultData,
  },
  // Add further templates here:
  // 'geberit-flyer-01': { id: 'geberit-flyer-01', label: 'Flyer (A4)', defaultData: flyer01Defaults },
};

export const defaultTemplateId = 'geberit-ad-01';
