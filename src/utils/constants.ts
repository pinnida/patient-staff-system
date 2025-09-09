export const THEME = {
  primary: '#6366f1',
  light: '#e0e7ff',
  white: '#ffffff',
  softGray: '#f8fafc',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
} as const;

export const STATUS = {
  active: 'active',
  inactive: 'inactive',
  submitted: 'submitted',
  error: 'error',
  disconnected: 'disconnected',
} as const;

export type PatientStatus = keyof typeof STATUS;

export const LANGUAGES = [
  { value: 'th', label: 'ไทย' },
  { value: 'en', label: 'English' },
] as const;

export const GENDERS = [
  { value: 'male', label: 'ชาย' },
  { value: 'female', label: 'หญิง' },
  { value: 'other', label: 'อื่นๆ' },
] as const;

export const STORAGE_KEYS = {
  patientDraft: 'patientFormDraft',
  patientLanguage: 'patientLanguage',
} as const;


