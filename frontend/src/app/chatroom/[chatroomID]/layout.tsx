'use client';
import { MessagesProvider } from '@/context/message';
type Props = {
  children: React.ReactNode;
};

export default function ChatRoomLayout({ children }: Props) {
  return (
    <div className="flex flex-col fixed top-0 h-screen w-full overflow-hidden items-center ">
      <div className="xl:w-1/3 md:w-1/2 sm:w-2/3 w-full h-screen">
        <MessagesProvider>{children}</MessagesProvider>
      </div>
    </div>
  );
}
