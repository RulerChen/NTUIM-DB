'use client';
import type { CardData } from '@/lib/shared_types';
import useActivity from '@/hooks/useActivity';
import All_Activity from '@/components/cards/All_Activity';

import { useEffect, useState } from 'react';

export default function Page() {
  const { getAllActivity, getActivityCapacity, deleteActivity } = useActivity();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [activityCounts, setActivityCounts] = useState<{ [key: string]: number }>({});

  const handleDelete = async (activity_id: string) => {
    await deleteActivity(activity_id);
    const newData = await getAllActivity('all');
    setCardData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllActivity('all');
      setCardData(data);

      const counts: { [key: string]: number } = {};
      for (const activity of data) {
        const response = await getActivityCapacity(activity.activity_id);
        counts[activity.activity_id] = response.number_of_participant;
      }
      setActivityCounts(counts);
    };

    fetchData();
  }, [getAllActivity, getActivityCapacity, deleteActivity]);

  return (
    <main className="flex flex-col justify-center min-h-full bg-gray-100 sm:p-5 lg:p-10 space-y-10">
      {cardData?.map((data) => (
        <All_Activity
          key={data.activity_id}
          data={data}
          count={activityCounts[data.activity_id]}
          onDelete={() => handleDelete(data.activity_id)}
        />
      ))}
    </main>
  );
}
