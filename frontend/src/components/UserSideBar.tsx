import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const UserSideBar = () => {
  return (
    <div className="rounded-xl shadow-md bg-white my-10">
      <div className="flex flex-col p-4">
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/profile" className="text-lg">
            修改個人資料
          </Link>
        </Button>
        <Separator orientation="horizontal" className="my-2 bg-black" />
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/unroute" className="text-lg">
            我主持的活動
          </Link>
        </Button>
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/unroute" className="text-lg">
            我追蹤的活動
          </Link>
        </Button>
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/unroute" className="text-lg">
            我參加的活動
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserSideBar;
