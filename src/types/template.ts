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
  // Hero taglines (overlaid on photo)
  tagline1: string;      // e.g. person's name "XXX"
  tagline2: string;      // "AND GEBERIT"
  tagline3: string;      // "THE PERFECT FIT" — bold, light blue

  // Body content (overlaid below taglines)
  salutation: string;    // "Dear XXX,"
  bodyText: string;      // main paragraph
  signoff: string;       // "Kind regards,\nYour HR team"

  // Gradient overlay opacity (0–1)
  gradientOpacity: number;

  // Background image
  backgroundImageId: string;
  customBackgroundBase64?: string;
  customBackgroundMimeType?: string;
}

export type AnyTemplateData = GeberitAd01Data | WelcomeCardData;

export interface TemplateDefinition {
  id: string;
  label: string;
  format: string;          // e.g. "A4 Portrait", "JIS B5 Landscape"
  defaultData: AnyTemplateData;
}

export const TEMPLATE_VERSION = '1.1';

export interface ExportedJSON {
  version: string;
  templateId: string;
  data: AnyTemplateData;
  exportedAt: string;
}
