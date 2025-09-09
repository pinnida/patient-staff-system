"use client";
import { Header } from '@/components/common/Header';
import { Layout } from '@/components/common/Layout';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { computeCompletionPercentage } from '@/utils/validation';
import { useMemo, useState } from 'react';

type PatientSummary = {
  id: string;
  values: any;
  status: 'active' | 'inactive' | 'submitted' | 'error' | 'disconnected';
  updatedAt: number;
};

export default function StaffPage() {
  const { events } = useRealTimeData();
  const [selected, setSelected] = useState<string | null>(null);

  const patients = useMemo(() => {
    const map = new Map<string, PatientSummary>();
    for (const e of events) {
      if (e.type === 'patient-connected') {
        const id = e.payload.id ?? e.payload?.id;
        if (!id) continue;
        map.set(id, { id, values: {}, status: 'active', updatedAt: Date.now() });
      }
      if (e.type === 'form-updated') {
        const id = e.payload.id;
        const prev = map.get(id) ?? { id, values: {}, status: 'active', updatedAt: 0 };
        map.set(id, { ...prev, values: e.payload.values, status: 'active', updatedAt: e.payload.ts || Date.now() });
      }
      if (e.type === 'form-submitted') {
        const baseId = e.payload.id;
        const submissionKey = `${baseId}-${e.payload.ts || Date.now()}`;
        const prev = map.get(submissionKey) ?? { id: submissionKey, values: {}, status: 'submitted', updatedAt: 0 };
        map.set(submissionKey, { ...prev, values: e.payload.values, status: 'submitted', updatedAt: e.payload.ts || Date.now() });
      }
      if (e.type === 'patient-disconnect') {
        const id = e.payload.id;
        const prev = map.get(id) ?? { id, values: {}, status: 'disconnected', updatedAt: 0 };
        map.set(id, { ...prev, status: 'disconnected', updatedAt: Date.now() });
      }
    }
    return Array.from(map.values()).sort((a, b) => b.updatedAt - a.updatedAt);
  }, [events]);

  return (
    <Layout>
      <Header title="แดชบอร์ดเจ้าหน้าที่" />
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                className="rounded-lg bg-white p-4 text-left shadow-sm hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-800">{p.values?.firstName || 'ผู้ป่วยกำลังกรอกข้อมูล...'}</span>
                  <StatusIndicator status={p.status} />
                </div>
                <div className="text-sm text-slate-600">ความคืบหน้า: {computeCompletionPercentage(p.values || {})}%</div>
                <div className="text-xs text-slate-500">อัปเดตล่าสุด: {new Date(p.updatedAt).toLocaleTimeString()}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-slate-800">รายละเอียดผู้ป่วย</h3>
            {selected ? (
              <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap text-xs text-slate-700">{JSON.stringify(patients.find((p) => p.id === selected)?.values, null, 2)}</pre>
            ) : (
              <div className="text-sm text-slate-600">เลือกการ์ดผู้ป่วยเพื่อดูรายละเอียด</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}


