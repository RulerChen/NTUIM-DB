import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminSideBar = () => {
  return (
    <div className="rounded-xl shadow-md bg-white my-10">
      <div className="flex flex-col p-4">
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/admin/check_activity" className="text-lg">
            查詢所有活動
          </Link>
        </Button>
        <hr />
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/admin/check_user" className="text-lg">
            查詢所有使用者
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminSideBar;
