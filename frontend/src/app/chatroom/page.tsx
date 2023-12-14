'use client';

import { useState, useEffect } from 'react';
import useActivity from '@/hooks/useActivity';
import type { CardData, ChatgroupData } from '@/lib/shared_types';
import ChatGroupList from '@/components/ChatGroupList';

export default function Page() {
  const [activityData, setActivityData] = useState<CardData[]>([]);
  const [chatgroupData, setChatgroupData] = useState<{
    [key: string]: ChatgroupData;
  }>({});
  const { getJoinedActivity, getChatgroup } = useActivity();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const joinedActivities: CardData[] = await getJoinedActivity();
        // Fetch chatgroup data for each joined activity
        const chatgroupDataMap: { [key: string]: ChatgroupData } = {};
        await Promise.all(
          joinedActivities.map(async (activity) => {
            const chatgroup = await getChatgroup({
              activity_id: activity.activity_id,
            });
            chatgroupDataMap[activity.activity_id] = chatgroup;
          })
        );

        setActivityData(joinedActivities);
        setChatgroupData(chatgroupDataMap);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [getJoinedActivity, getChatgroup]);

  return (
    <main className="flex flex-col justify-center min-h-full bg-gray-100 sm:p-5 lg:p-10 space-y-10">
      {activityData?.map((activity) => (
        <ChatGroupList
          key={chatgroupData[activity.activity_id].chatgroup_id}
          data={chatgroupData[activity.activity_id]}
        />
      ))}
    </main>
  );
}
