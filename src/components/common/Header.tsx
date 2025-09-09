"use client";
import Link from 'next/link';
import { Cross } from 'lucide-react';

export function Header({ title }: { title: string }) {

  return (
    <header className="w-full border-b border-gray-200 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Cross className="h-6 w-6 text-indigo-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-100">{title}</span>
        </Link>
        <div />
      </div>
    </header>
  );
}


