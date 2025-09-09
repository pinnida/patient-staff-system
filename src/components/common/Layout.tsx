import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-neutral-900 dark:text-slate-100">
      <main className="mx-auto max-w-6xl p-4">{children}</main>
    </div>
  );
}


