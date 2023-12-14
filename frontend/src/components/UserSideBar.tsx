import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const UserSideBar = () => {
  return (
    <div className="rounded-xl shadow-md bg-white my-10">
      <div className="flex flex-col  sm:p-4 text-sm lg:text-lg">
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user" className="text-sm lg:text-lg">
            瀏覽個人資料
          </Link>
        </Button>
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/profile" className="text-sm lg:text-lg">
            修改個人資料
          </Link>
        </Button>
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/password" className="text-sm lg:text-lg">
            變更個人密碼
          </Link>
        </Button>
        <Separator orientation="horizontal" className="my-2 bg-black" />
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/host" className="text-sm lg:text-lg">
            我主持的活動
          </Link>
        </Button>
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/follow" className="text-sm lg:text-lg">
            我追蹤的活動
          </Link>
        </Button>
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/user/join" className="text-sm lg:text-lg">
            我參加的活動
          </Link>
        </Button>
        <Separator orientation="horizontal" className="my-2 bg-black" />
        <Button className="bg-white text-black rounded-lg h-[10vh] hover:bg-neutral-100 transition font-semibold">
          <Link href="/chatroom" className="text-sm lg:text-lg">
            聊天室
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserSideBar;
