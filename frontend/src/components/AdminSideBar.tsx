import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const AdminSideBar = () => {
  return (
    <div className="rounded-xl shadow-md bg-white my-10">
      <div className="flex flex-col  sm:p-4 text-sm lg:text-lg">
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/admin/all_activies" className="text-sm lg:text-lg">
            查詢所有活動
          </Link>
        </Button>
        <Separator orientation="horizontal" className="my-2 bg-black" />
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/admin/all_users" className="text-sm lg:text-lg">
            查詢所有使用者
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminSideBar;
