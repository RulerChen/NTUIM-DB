import { MessagesContext } from '@/context/message';
import { useContext, useState } from 'react';
import { useMember } from '@/hooks/useMember';
import { nanoid } from 'nanoid';

interface ChatRoomInputProps {
  id: string;
}

const ChatRoomInput: React.FC<ChatRoomInputProps> = ({ id }) => {
  const { sendMessage } = useContext(MessagesContext);
  const { member } = useMember();

  const [content, setContent] = useState<string>('');
  const chatroom_id = id;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    sendMessage({
      message_id: nanoid(),
      chatgroup_id: chatroom_id as string,
      member_id: member!.member_id,
      message_text: content,
    });
    setContent('');
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aa"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out"
      />
      <button
        type="submit"
        className="bg-black text-white py-1 px-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  );
};

export default ChatRoomInput;
