'use client';

type Props = {
  children: React.ReactNode;
};

export default function ChatLayout({ children }: Props) {
  return <div className="w-full">{children}</div>;
}
