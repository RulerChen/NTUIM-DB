import AdminSideBar from '@/components/AdminSideBar';

type Props = {
  children: React.ReactNode;
};

async function AdminLayout({ children }: Props) {
  return (
    <main className="flex-row justify-center top-0 flex w-full overflow-hidden">
      <nav className="w-1/3 pb-10 bg-gray-100 pl-8">
        <AdminSideBar />
      </nav>
      <div className="w-full">{children}</div>
    </main>
  );
}

export default AdminLayout;
