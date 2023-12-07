import UserSideBar from '@/components/UserSideBar';

type Props = {
  children: React.ReactNode;
};

async function UserLayout({ children }: Props) {
  return (
    <main className="flex-rows top-0 flex h-screen w-full overflow-hidden">
      <nav className="w-1/3 pb-10 bg-gray-100 pl-8">
        <UserSideBar />
      </nav>
      <div className="w-full overflow-y-scroll">{children}</div>
    </main>
  );
}

export default UserLayout;
