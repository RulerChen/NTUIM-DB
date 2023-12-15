'use client';
import { MessagesContext } from '@/context/message';
import { useContext, useEffect, useState } from 'react';
import { useMember } from '@/hooks/useMember';
import Avatar from './Avatar';
import useActivity from '@/hooks/useActivity';
import { getMessagePayload, Message } from '@/lib/shared_types';

function ChatRoomMessages({ id }: { id: string }) {
  const { messages, setMessages } = useContext(MessagesContext);
  const [text, setText] = useState<Message[]>([]);
  const { getMessage } = useActivity();
  const { member } = useMember();

  useEffect(() => {
    const fetchData = async () => {
      const payload: getMessagePayload = { chatgroup_id: id };
      const newData = await getMessage(payload);
      console.log(newData);
      setText(newData.data);
      setMessages(newData.data);
    };
    fetchData();
  }, [getMessage]);

  return (
    <div className="px-2 pt-4">
      {text?.map((message, index) => {
        const isSender = message.member_id === member?.member_id;
        return (
          <div key={index} className="w-full pt-1">
            <div className={`flex flex-row items-end gap-2 ${isSender && 'justify-end'}`}>
              {!isSender && <Avatar />}
              <div
                className={`max-w-[60%] rounded-2xl px-3 py-1 leading-6 ${
                  isSender ? 'bg-black text-white' : ' bg-gray-200 text-black'
                }`}
              >
                {message.message_text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatRoomMessages;
