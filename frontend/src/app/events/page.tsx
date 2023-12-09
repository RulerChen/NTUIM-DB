'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';
import type { CardData } from '@/lib/shared_types';

type CardFollowData = {
  activity_id: string;
};

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const { member } = useMember();

  const [cardData, setCardData] = useState<CardData[]>([]);
  const [cardFollowData, setCardFollowData] = useState<CardFollowData[]>([]);

  const { getAllActivity, getFollowedActivity } = useActivity();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllActivity(category);
      setCardData(data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    const fetchData = async (member_id: string) => {
      const data = await getFollowedActivity({ member_id });
      setCardFollowData(data);
    };
    if (member) {
      fetchData(member.member_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {cardData?.map((card) => (
          <Card
            key={card.activity_id}
            data={card}
            follow={cardFollowData.some((item) => item.activity_id === card.activity_id)}
          />
        ))}
      </div>
    </Container>
  );
}
