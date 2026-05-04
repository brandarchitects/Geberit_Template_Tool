export interface GeberitAd01Data {
  // Hero area taglines (over background image)
  tagline1: string;
  tagline2: string;
  tagline3: string; // Rendered in color #B4CDF0 (bold)

  // Gradient overlay opacity (0–1)
  gradientOpacity: number;

  // Intro block
  lookingForLabel: string;
  jobTitle: string;

  // Left column
  aboutTitle: string;
  aboutText: string;

  responsibilitiesTitle: string;
  responsibilitiesItems: string[];

  // Right column
  profileTitle: string;
  profileItems: string[];

  applicationTitle: string;
  applicationText: string;

  contactTitle: string;
  contactText: string;

  // Background image selection
  backgroundImageId: string;
  customBackgroundBase64?: string;
  customBackgroundMimeType?: string;
}

export interface WelcomeCardData {
  // Hero taglines (large, bottom-left of image)
  tagline1: string;
  tagline2: string;
  tagline3: string; // bold, light-blue

  // Body text block
  salutation: string;
  bodyText: string;
  signoff: string;

  // Gradient overlay opacity (0–1)
  gradientOpacity: number;

  // Background image selection
  backgroundImageId: string;
  customBackgroundBase64?: string;
  customBackgroundMimeType?: string;
}

export type AnyTemplateData = GeberitAd01Data | WelcomeCardData;

export interface TemplateDefinition {
  id: string;
  label: string;
  defaultData: AnyTemplateData;
  format: 'a4-portrait' | 'b5-landscape';
}

export const TEMPLATE_VERSION = '1.0';

export interface ExportedJSON {
  version: string;
  templateId: string;
  data: AnyTemplateData;
  exportedAt: string;
}
