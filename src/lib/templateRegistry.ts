import { TemplateDefinition } from '@/types/template';
import { defaultData as ad01Defaults } from '@/components/templates/geberit-ad-01/defaultData';
import { defaultData as welcomeCardDefaults } from '@/components/templates/geberit-welcome-card/defaultData';

export const templateRegistry: Record<string, TemplateDefinition> = {
  'geberit-ad-01': {
    id: 'geberit-ad-01',
    label: 'Job Advertisement (A4)',
    defaultData: ad01Defaults,
    format: 'a4-portrait',
  },
  'geberit-welcome-card': {
    id: 'geberit-welcome-card',
    label: 'Welcome Card (B5 Landscape)',
    defaultData: welcomeCardDefaults,
    format: 'b5-landscape',
  },
};

export const defaultTemplateId = 'geberit-ad-01';
