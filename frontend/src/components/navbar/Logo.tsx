'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push('/events?category=all')}
      className="hidden md:block cursor-pointer"
      src="/images/joinus.png"
      height="50"
      width="50"
      alt="Logo"
    />
  );
};

export default Logo;
