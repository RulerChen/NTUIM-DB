'use client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';

interface HeartButtonProps {
  id: string;
  isFollow?: boolean;
}

const HeartButton = ({ id, isFollow }: HeartButtonProps) => {
  const { followActivity } = useActivity();
  const { member, fetchFollowActivity } = useMember();

  const toggleFavorite = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!member) return;
    await followActivity({ activity_id: id });
    fetchFollowActivity();
    if (isFollow) {
      toast.success('取消收藏成功');
    } else if (!isFollow) {
      toast.success('收藏成功');
    }
  };

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
      <AiFillHeart size={24} className={isFollow ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  );
};

export default HeartButton;
