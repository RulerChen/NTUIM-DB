'use client';
import { useState, useEffect } from 'react';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';
import type { CardData } from '@/lib/shared_types';
import UserCategories from '@/components/navbar/UserCategories';

export default function Page() {
  const [joinedActivities, setJoinedActivities] = useState<CardData[]>([]);
  const { getJoinedActivity } = useActivity();
  const { follow_activity } = useMember();
  useEffect(() => {
    const fetchData = async () => {
      const followedData = await getJoinedActivity();
      setJoinedActivities(followedData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <UserCategories />
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {joinedActivities?.map((card) => (
            <Card
              key={card.activity_id}
              data={card}
              follow={follow_activity.some((item) => item.activity_id === card.activity_id)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
