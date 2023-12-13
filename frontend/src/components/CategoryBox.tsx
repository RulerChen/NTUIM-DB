'use client';

import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  href: string;
}

const CategoryBox = ({ icon: Icon, label, selected, href }: CategoryBoxProps) => {
  const router = useRouter();

  function handleClick() {
    router.push(href);
  }

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-between
        gap-2
        p-1
        md:p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        mb-[6pt]
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm text-center w-[4rem] md:w-full">{label}</div>
    </div>
  );
};

export default CategoryBox;
