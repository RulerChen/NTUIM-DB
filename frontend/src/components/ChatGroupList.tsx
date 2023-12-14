'use client';

import ChatgroupData from '@/lib/shared_types';
import Link from 'next/link';

const ChatGroupList = ({ data }: { data: ChatgroupData }) => {
  return (
    <>
      <Link href={`/chatroom/${data.chatgroup_id}`}>{data.chat_name}</Link>
    </>
  );
};

export default ChatGroupList;
