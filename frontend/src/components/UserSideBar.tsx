import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const UserSideBar = () => {
  return (
    <div className="flex flex-col justify-center px-8 py-6">
      <Button className="bg-slate-200 text-black rounded-lg hover:text-white">
        <Link href="/user/profile">修改個人資料</Link>
      </Button>
      <Separator orientation="horizontal" className="my-2 bg-black" />
    </div>
  );
};

export default UserSideBar;
