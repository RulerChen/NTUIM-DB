'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import useActivity from '@/hooks/useActivity';
import type { CardData } from '@/lib/shared_types';

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [cardData, setCardData] = useState<CardData[]>([]);

  const { getAllActivity } = useActivity();

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
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {cardData?.map((card) => <Card key={card.activity_id} data={card} />)}
      </div>
    </Container>
  );
}
