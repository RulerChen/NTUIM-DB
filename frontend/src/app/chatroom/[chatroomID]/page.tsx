'use client';

import ChatRoomInput from '@/components/ChatRoomInput';
import ChatRoomMessages from '@/components/ChatRoomMessages';
import Link from 'next/link';

import { useState, useEffect } from 'react';
export default function Page({ params }: { params: { chatroomID: string } }) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    setId(params.chatroomID);
  }, [params.chatroomID]);

  return (
    <>
      <div className="w-full h-full overflow-hidden flex flex-col shadow-lg">
        <nav className="w-full shadow-md p-3 text-md font-semibold">Chatroom</nav>
        <div className="overflow-y-scroll grow">
          <ChatRoomMessages id={id!} />
        </div>
        <div className="p-2">
          <ChatRoomInput id={id!} />
        </div>
      </div>
      <Link href="/chatroom">上一頁</Link>
    </>
  );
}
