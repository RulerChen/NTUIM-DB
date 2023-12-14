'use client';

import AdminSideBar from '@/components/AdminSideBar';

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <main className="flex-row justify-center top-0 flex w-full min-h-full">
      <nav className="w-1/3 pb-0 sm:pb-10 bg-gray-100 pl-2 sm:pl-8">
        <AdminSideBar />
      </nav>
      <div className="w-full">{children}</div>
    </main>
  );
}
