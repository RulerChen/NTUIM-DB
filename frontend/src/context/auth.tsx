'use client';
import React, { useState, createContext, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRedirectDone, setInitialRedirectDone] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function isAuth() {
      await axios.get('/user/isAuthenticated', { withCredentials: true }).then((res) => {
        if (res.data) {
          setIsLoggedIn(true);
        }
        setInitialRedirectDone(true);
      });
    }
    isAuth();
  }, []);

  useEffect(() => {
    if (initialRedirectDone) {
      if (!isLoggedIn) {
        router.push('/');
      }
    }
  }, [isLoggedIn, initialRedirectDone, router]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>
  );
}
