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
  backgroundImageId: string; // e.g. "Geberit_Ad_01"
  customBackgroundBase64?: string;
  customBackgroundMimeType?: string;
}

export interface TemplateDefinition {
  id: string;
  label: string;
  defaultData: GeberitAd01Data;
}

export const TEMPLATE_VERSION = '1.0';

export interface ExportedJSON {
  version: string;
  templateId: string;
  data: GeberitAd01Data;
  exportedAt: string;
}
