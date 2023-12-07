'use client';

import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import MenuItem from './MenuItem';
import Avatar from '../Avatar';

interface UserMenuProps {
  // currentUser?: SafeUser | null;
  currentUser?: null | boolean;
}

const UserMenu = ({ currentUser = true }: UserMenuProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (path: string) => {
    router.push(path);
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
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
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[180%] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                {/* TODO: add route */}
                <MenuItem label="進入會員中心" onClick={() => handleClick('/user')} />
                <MenuItem label="修改個人資料" onClick={() => handleClick('/user/profile')} />
                <MenuItem label="我主持的活動" onClick={() => handleClick('/unchange_route')} />
                <MenuItem label="我追蹤的活動" onClick={() => handleClick('/unchange_route')} />
                <MenuItem label="我參加的活動" onClick={() => handleClick('/unchange_route')} />
                <hr />
                <MenuItem label="登出" onClick={() => {}} />
              </>
            ) : (
              <>
                <MenuItem label="登入" onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
