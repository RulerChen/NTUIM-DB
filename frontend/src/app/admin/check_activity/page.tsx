'use client';

import type { CardData } from '@/lib/shared_types';
import useActivity from '@/hooks/useActivity';
import { useState } from 'react';
import All_Activity from '@/components/cards/All_Activity';

export default function Page() {
  const { getAllActivity } = useActivity();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const fetchData = async () => {
    const data = await getAllActivity('all');
    setCardData(data);
  };
  fetchData();

  return (
    <main className="flex flex-col justify-center min-h-full bg-gray-100 sm:p-5 lg:p-10 space-y-10">
      {cardData?.map((data) => <All_Activity key={data.activity_id} data={data} />)}
    </main>
  );
}
