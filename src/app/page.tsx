import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">ระบบลงทะเบียนผู้ป่วย</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">เลือกหน้าที่ต้องการ</p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/patient" className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md dark:bg-neutral-800">
            <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100">ผู้ป่วย</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">กรอกแบบฟอร์มลงทะเบียนผู้ป่วย</p>
          </Link>
          <Link href="/staff" className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md dark:bg-neutral-800">
            <h2 className="text-lg font-medium text-slate-800 dark:text-slate-100">เจ้าหน้าที่</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">ติดตามสถานะและแบบฟอร์มแบบเรียลไทม์</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
