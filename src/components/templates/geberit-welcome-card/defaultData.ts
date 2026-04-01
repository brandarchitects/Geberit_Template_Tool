import { WelcomeCardData } from '@/types/template';
import { WC } from './constants';

export const defaultWelcomeCardData: WelcomeCardData = {
  tagline1: 'XXX',
  tagline2: 'AND GEBERIT',
  tagline3: 'THE PERFECT FIT',

  salutation: 'Dear XXX,',
  bodyText:
    'Only a few more days until you join us at Geberit.\nWe look forward to welcoming you to our company.',
  signoff: 'Kind regards,\nYour HR team',

  gradientOpacity: 0.75,
  backgroundImageId: WC.defaultBackgroundId,
};
