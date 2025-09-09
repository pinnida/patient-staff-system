import clsx from 'clsx';

type Props = { status: 'active' | 'inactive' | 'submitted' | 'error' | 'disconnected' };

export function StatusIndicator({ status }: Props) {
  const color =
    status === 'submitted'
      ? 'bg-emerald-500' // green when submitted
      : status === 'active'
      ? 'bg-amber-500' // yellow when typing/active
      : status === 'error'
      ? 'bg-red-500'
      : 'bg-gray-400'; // gray when offline/inactive

  const label =
    status === 'submitted'
      ? 'ส่งแล้ว'
      : status === 'active'
      ? 'กำลังกรอก'
      : status === 'error'
      ? 'ผิดพลาด'
      : 'ออฟไลน์';

  return (
    <span className="inline-flex items-center gap-1" aria-label={status} title={label}>
      <span className={clsx('inline-block h-3 w-3 rounded-full', color)} />
      <span className="text-xs text-slate-600">{label}</span>
    </span>
  );
}


