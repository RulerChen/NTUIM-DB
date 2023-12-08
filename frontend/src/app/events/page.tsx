'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';

import { CardData } from '@/types/card.type';
import axios from '@/lib/axios';

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const [cardData, setCardData] = useState<CardData[]>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      const { data } = await axios.get('/activity', {
        params: {
          category,
        },
      });
      setCardData(data);
    };
    fetchCardData();
  }, [category]);

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {cardData?.map((card) => <Card key={card.activity_id} data={card} />)}
      </div>
    </Container>
  );
}
