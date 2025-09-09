import { useCallback, useMemo, useState } from 'react';
import { validationSchema, type PatientFormValues } from '@/utils/validation';

export function useFormValidation(initial: Partial<PatientFormValues> = {}) {
  const [values, setValues] = useState<Partial<PatientFormValues>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((next?: Partial<PatientFormValues>) => {
    const data = { ...values, ...next } as PatientFormValues;
    const res = validationSchema.safeParse(data);
    if (!res.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of res.error.issues) {
        const key = issue.path[0] as string;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return { valid: false, errors: fieldErrors } as const;
    }
    setErrors({});
    return { valid: true, value: res.data } as const;
  }, [values]);

  const setField = useCallback(<K extends keyof PatientFormValues>(key: K, value: PatientFormValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues({});
    setErrors({});
  }, []);

  return useMemo(() => ({ values, errors, setField, setValues, validate, reset }), [values, errors, setField, validate, reset]);
}


