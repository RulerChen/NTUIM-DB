'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';
import type { CardData } from '@/lib/shared_types';

// '我的活動'頁面
export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  // category can be {'userActivity', 'userWork', 'userLike'}
  const { member } = useMember();
  const { getFollowedActivity, getJoinedActivity } = useActivity();
  const { follow_activity } = useMember();

  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const member_id = member?.member_id;
      if (!member_id) return;
      if (category === 'userActivity' || category === 'userWork') {
        const data = await getJoinedActivity();
        setCardData(data);
      } else if (category === 'userLike') {
        const data = await getFollowedActivity();
        setCardData(data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {cardData
          ?.filter(
            (card) =>
              (category == 'userWork' && card.activity_tag === 'work') ||
              (category == 'userActivity' && card.activity_tag !== 'work') ||
              (category == 'userLike' &&
                follow_activity.some((item) => item.activity_id === card.activity_id))
          )
          .map((card) => (
            <Card
              key={card.activity_id}
              data={card}
              follow={follow_activity.some((item) => item.activity_id === card.activity_id)}
            />
          ))}
      </div>
    </Container>
  );
}
