import { z } from 'zod';

export const validationSchema = z.object({
  firstName: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณากรอกข้อมูลให้ครบถ้วน').min(2, 'กรุณากรอกอย่างน้อย 2 ตัวอักษร')
  ),
  middleName: z.string().optional().or(z.literal('')),
  lastName: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณากรอกข้อมูลให้ครบถ้วน').min(2, 'กรุณากรอกอย่างน้อย 2 ตัวอักษร')
  ),
  dateOfBirth: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณาเลือกวันเกิด')
  ),
  gender: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณาเลือกเพศ')
  ),
  phoneNumber: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณากรอกข้อมูลให้ครบถ้วน').regex(/^\+?[0-9]{10,15}$/, 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง ex. 0812345678')
  ),
  email: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณากรอกข้อมูลให้ครบถ้วน').email('กรุณากรอกอีเมลที่ถูกต้อง ex. email@mail.com')
  ),
  address: z.preprocess((v) => (v == null ? '' : v),
    z.string().min(1, 'กรุณากรอกข้อมูลให้ครบถ้วน').min(10, 'ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร')
  ),
  preferredLanguage: z.string().optional(),
  nationality: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  religion: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof validationSchema>;

export function computeCompletionPercentage(values: Partial<PatientFormValues>): number {
  const requiredKeys: (keyof PatientFormValues)[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'phoneNumber',
    'email',
    'address',
  ];

  const filled = requiredKeys.filter((k) => {
    const v = values[k];
    return typeof v === 'string' ? v.trim().length > 0 : Boolean(v);
  }).length;

  return Math.round((filled / requiredKeys.length) * 100);
}


