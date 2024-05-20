'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';
import type { CardData } from '@/lib/shared_types';

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const { follow_activity } = useMember();
  const { getAllActivity } = useActivity();

  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllActivity(category);
      setCardData(data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {cardData?.map((card) => (
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
