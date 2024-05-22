'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import MenuItem from './MenuItem';
import { Button } from '@/components/ui/button';
import Avatar from '../Avatar';

import { AiOutlineMenu } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';

import { useMember } from '@/hooks/useMember';

const UserMenu = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const { member, logout } = useMember();
  const divRef = useRef<HTMLDivElement>(null);

  const handleClick = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(!isOpen);
    router.push('/');
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <Button
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition"
          variant="outline"
          onClick={() => router.push('/new_user?category=userActivity')}
        >
          <div className="hidden m-0 md:block md:mr-2">我的活動</div>
          {/* <VscAdd size={20}></VscAdd> */}
        </Button>
        <Button
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800 transition"
          variant="outline"
          onClick={() => router.push('/activity/create')}
        >
          <div className="hidden m-0 md:block md:mr-2">新增活動</div>
          <VscAdd size={20}></VscAdd>
        </Button>
        <div
          ref={divRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[75%] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {member ? (
              <>
                {/* TODO: add route */}
                <MenuItem label="進入會員中心" onClick={() => handleClick('/user')} />
                <MenuItem label="修改個人資料" onClick={() => handleClick('/user/profile')} />
                <MenuItem label="修改個人密碼" onClick={() => handleClick('/user/password')} />
                <MenuItem label="我主持的活動" onClick={() => handleClick('/user/host')} />
                <MenuItem label="我追蹤的活動" onClick={() => handleClick('/user/follow')} />
                <MenuItem label="我參加的活動" onClick={() => handleClick('/user/join')} />
                <MenuItem label="聊天室" onClick={() => handleClick('/chatroom')} />
                <MenuItem label="admin" onClick={() => handleClick('/admin')} />
                <hr />
                <MenuItem label="登出" onClick={handleLogout} />
              </>
            ) : (
              <>
                <MenuItem label="登入" onClick={() => router.push('/login')} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
