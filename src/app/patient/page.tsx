"use client";
import { Header } from '@/components/common/Header';
import { Layout } from '@/components/common/Layout';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useToast } from '@/components/common/Toast';
// import { useRouter } from 'next/navigation';

export default function PatientPage() {
  const { values, errors, setField, setValues, validate, reset } = useFormValidation();
  const { socket } = useWebSocket();
  const { showToast } = useToast();
  // const router = useRouter();

  useEffect(() => {
    if (!socket) return;
    // Announce patient presence so staff dashboard can create/track the card immediately
    socket.emit('patient-connect', { values, ts: Date.now() });
  }, [socket, values]);

  useEffect(() => {
    // broadcast form updates in real-time
    socket?.emit('form-update', { values, ts: Date.now() });
  }, [socket, values]);

  const onSubmit = () => {
    const res = validate();
    if (res.valid) {
      socket?.emit('form-submit', { values: res.value, ts: Date.now() });
      showToast('ส่งแบบฟอร์มเรียบร้อย', 'success');
      reset();
      // router.push('/');
    } else {
      showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
    }
  };

  return (
    <Layout>
      <Header title="ลงทะเบียนผู้ป่วย" />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">ข้อมูลส่วนตัว</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Input required label="ชื่อ" value={values.firstName || ''} onChange={(v) => { setField('firstName', v); validate({ firstName: v }); }} error={errors.firstName} />
            <Input label="ชื่อกลาง" value={values.middleName || ''} onChange={(v) => { setField('middleName', v); validate({ middleName: v }); }} />
            <Input required label="นามสกุล" value={values.lastName || ''} onChange={(v) => { setField('lastName', v); validate({ lastName: v }); }} error={errors.lastName} />
            <Input required type="date" label="วันเกิด" value={values.dateOfBirth || ''} onChange={(v) => { setField('dateOfBirth', v); validate({ dateOfBirth: v }); }} error={errors.dateOfBirth} />
            <Select required label="เพศ" value={values.gender || ''} onChange={(v) => { setField('gender', v); validate({ gender: v }); }} options={[{value:'male',label:'ชาย'},{value:'female',label:'หญิง'},{value:'other',label:'อื่นๆ'}]} error={errors.gender} />
            <Input required label="เบอร์โทร" value={values.phoneNumber || ''} onChange={(v) => { setField('phoneNumber', v); validate({ phoneNumber: v }); }} error={errors.phoneNumber} />
            <Input required label="อีเมล" value={values.email || ''} onChange={(v) => { setField('email', v); validate({ email: v }); }} error={errors.email} />
            <div className="md:col-span-2">
              <Textarea required label="ที่อยู่" value={values.address || ''} onChange={(v) => { setField('address', v); validate({ address: v }); }} error={errors.address} />
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">ข้อมูลเพิ่มเติม</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Select label="ภาษา" value={values.preferredLanguage || ''} onChange={(v) => { setField('preferredLanguage', v); validate({ preferredLanguage: v }); }} options={[{value:'th',label:'ไทย'},{value:'en',label:'English'}]} />
            <Input label="สัญชาติ" value={values.nationality || ''} onChange={(v) => { setField('nationality', v); validate({ nationality: v }); }} />
            <Input label="ผู้ติดต่อฉุกเฉิน" value={values.emergencyContactName || ''} onChange={(v) => { setField('emergencyContactName', v); validate({ emergencyContactName: v }); }} />
            <Input label="ความสัมพันธ์" value={values.emergencyContactRelationship || ''} onChange={(v) => { setField('emergencyContactRelationship', v); validate({ emergencyContactRelationship: v }); }} />
            <Select label="ศาสนา" value={values.religion || ''} onChange={(v) => { setField('religion', v); validate({ religion: v }); }} options={[{value:'buddhism',label:'พุทธ'},{value:'christian',label:'คริสต์'},{value:'islam',label:'อิสลาม'},{value:'hindu',label:'ฮินดู'},{value:'other',label:'อื่นๆ'}]} />
          </div>
        </section>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="rounded-lg border-2 border-gray-200 px-4 py-2 text-slate-700 hover:bg-slate-50" onClick={() => setValues({})}>ล้างข้อมูล</button>
        <button className="rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600" onClick={onSubmit}>ส่งแบบฟอร์ม</button>
      </div>
    </Layout>
  );
}

function FieldWrapper({ label, error, children, required }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-slate-600">{label} {required ? <span className="text-red-500">*</span> : null}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}

function Input({ label, value, onChange, error, type = 'text', required }: { label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; required?: boolean }) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <input
        type={type}
        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldWrapper>
  );
}

function Textarea({ label, value, onChange, error, required }: { label: string; value: string; onChange: (v: string) => void; error?: string; required?: boolean }) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <textarea
        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FieldWrapper>
  );
}

function Select({ label, value, onChange, options, error, required }: { label: string; value: string; onChange: (v: string) => void; options: {value:string;label:string}[]; error?: string; required?: boolean }) {
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <select
        className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- เลือก --</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </FieldWrapper>
  );
}


