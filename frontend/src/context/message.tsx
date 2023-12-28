'use client';
import { createContext, useEffect, useState } from 'react';
import type { Message } from '@/lib/shared_types';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import useActivity from '@/hooks/useActivity';

export type MessagesContext = {
  messages: Message[];
  socket: Socket | null;
  setMessages: (messages: Message[]) => void;
  sendMessage: (message: Omit<Message, 'message_time'>) => Promise<void>;
};

export const MessagesContext = createContext<MessagesContext>({
  messages: [],
  setMessages: () => {},
  socket: null,
  sendMessage: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export function MessagesProvider({ children }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { insertMessage } = useActivity();

  useEffect(() => {
    const initSocket = () => {
      const socket = io('http://localhost:8080');
      socket.on('receive_message', (newMessage: Message) => {
        console.log('new message');
        setMessages((messages) => [...messages, newMessage]);
      });
      setSocket(socket);
    };
    initSocket();
  }, []);

  const sendMessage = async (message: Omit<Message, 'message_time'>) => {
    if (!socket) {
      alert('No socket! Please retry later.');
      return;
    }
    try {
      const newMessage: Omit<Message, 'activity_id'> = {
        ...message,
        message_time: new Date(),
      };
      const data = await insertMessage(newMessage);
      console.log(data);
      if (data && data.data) {
        socket.emit('send_message', data.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessagesContext.Provider value={{ messages, setMessages, sendMessage, socket }}>
      {children}
    </MessagesContext.Provider>
  );
}
