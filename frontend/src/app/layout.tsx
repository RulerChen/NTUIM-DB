import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ToasterContext from '@/context/toast';
import { AuthProvider } from '@/context/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Database Final',
  description: 'Our final project for database.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-tw">
      <body className={inter.className}>
        <ToasterContext />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
