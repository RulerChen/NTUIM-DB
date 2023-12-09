'use client';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';

interface HeartButtonProps {
  id: string;
  isFollow?: boolean;
}

const HeartButton = ({ id, isFollow }: HeartButtonProps) => {
  const { followActivity } = useActivity();
  const { member } = useMember();
  const [follow, setFollow] = useState(isFollow);
  // TODO: add follow logic
  const toggleFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!member) return;
    followActivity({ member_id: member.member_id, activity_id: id });
    setFollow(!follow);
  };

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      {/* if follow */}
      <AiFillHeart size={24} className={follow ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  );
};

export default HeartButton;
