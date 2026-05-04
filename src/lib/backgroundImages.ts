export const BACKGROUND_IMAGES = [
  'Geberit_Ad_01',
  'Geberit_Ad_02',
  'Geberit_Ad_03',
  'Geberit_Ad_04',
  'Geberit_Ad_05',
  'Geberit_Ad_06',
  'Geberit_Ad_07',
  'Geberit_Ad_08',
  'Geberit_Ad_09',
  'Geberit_Ad_10',
  'Geberit_Ad_11',
  'Geberit_Ad_12',
  'Geberit_Ad_13',
  'Geberit_Ad_14',
  'Geberit_Ad_15',
  'Geberit_Ad_16',
] as const;

export type BackgroundImageId = typeof BACKGROUND_IMAGES[number];

export const DEFAULT_BACKGROUND_ID = 'Geberit_Ad_01';
