// ─── Identity ───────────────────────────────────────────────
export const OWNER_NAME = 'Riza Sahin';
export const COMPANY_NAME = 'Continuous-Next';
export const OWNER_EMAIL = 'riza.sahin@continuous-next.de';
export const OWNER_PHONE = '+49 1 777 888 604';
export const OWNER_WEBSITE = 'www.continuous-next.de';
export const OWNER_LOCATION_CITY = 'Germany';

// ─── Site Config ────────────────────────────────────────────
export const SITE_NAME = 'Continuous-Next';
export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = ['en', 'de'] as const;
export const LANGUAGE_STORAGE_KEY = 'continuous-next-lang';

// ─── Layout ─────────────────────────────────────────────────
export const NAVBAR_HEIGHT_PX = 72;
export const MAX_CONTENT_WIDTH_PX = 1200;

// ─── Theme ──────────────────────────────────────────────────
export const THEME_STORAGE_KEY = 'continuous-next-theme';
export const THEME_LIGHT = 'light' as const;
export const THEME_DARK = 'dark' as const;

// ─── Key Figures ────────────────────────────────────────────
export const YEARS_OF_EXPERIENCE = 13;
export const ACCENTURE_YEARS = 8;
export const PUBLIC_SECTOR_YEARS = 4;
export const PRODUCT_TEAMS_ONBOARDED = 7;
export const SCRUM_TEAM_MEMBERS_LED = 50;
export const SUBJECT_MATTER_EXPERTS_MANAGED = 80;
export const BROADCASTERS_GO_LIVE = 4;
export const PRODUCTS_HANDED_OVER = 50;
export const SUBSIDIARIES_ANALYZED = 26;

// ─── Experience Timeline ────────────────────────────────────
export const EXPERIENCE_PROJECTS = [
  { id: 'eon-atlantis',        startDate: '2024-05', endDate: 'present',  ongoing: true  },
  { id: 'ard-deinsap',         startDate: '2022-01', endDate: '2026-12',  ongoing: true  },
  { id: 'rethink-innovations', startDate: '2020-10', endDate: '2023-12',  ongoing: false },
  { id: 'lanxess-fit',         startDate: '2018-05', endDate: '2020-10',  ongoing: false },
  { id: 'eon-esp',             startDate: '2016-06', endDate: '2018-04',  ongoing: false },
  { id: 'volkswagen-iportal',  startDate: '2014-10', endDate: '2016-06',  ongoing: false },
  { id: 'daimler-connectme',   startDate: '2014-03', endDate: '2014-09',  ongoing: false },
  { id: 'vodafone-uk',         startDate: '2013-08', endDate: '2014-02',  ongoing: false },
  { id: 'vodafone-de',         startDate: '2012-12', endDate: '2013-08',  ongoing: false },
  { id: 'telekom',             startDate: '2011-08', endDate: '2012-12',  ongoing: false },
  { id: 'henkel',              startDate: '2011-02', endDate: '2011-08',  ongoing: false }
] as const;

// ─── Email ──────────────────────────────────────────────────
export const EMAIL_SUBJECT_EN = 'Consulting Inquiry — Continuous-Next';
export const EMAIL_SUBJECT_DE = 'Beratungsanfrage — Continuous-Next';

// ─── Animation Timing ───────────────────────────────────────
export const FADE_IN_THRESHOLD = 0.15;
export const FADE_IN_ROOT_MARGIN = '0px 0px -50px 0px';

// ─── Stats Counter Animation ────────────────────────────────
export const STAT_COUNTER_DURATION_MS = 1800;
