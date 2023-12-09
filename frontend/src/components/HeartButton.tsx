'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  id: string;
}

const HeartButton = ({ id }: HeartButtonProps) => {
  // TODO: add follow logic
  const toggleFavorite = () => {
    console.log(`${id} is clicked`);
  };

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      {/* if follow */}
      <AiFillHeart size={24} className={true ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  );
};

export default HeartButton;
