'use client';
import { createContext, useState } from 'react';
import type { MemberData } from '@/lib/shared_types';

export type UserContext = {
  user: MemberData | null;
  setUser: (user: MemberData) => void;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
};
export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<MemberData | null>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
