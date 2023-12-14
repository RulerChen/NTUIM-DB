'use client';
import { useState, useEffect } from 'react';

import Container from '@/components/Container';
import Card from '@/components/cards/Card';
import type { CardData } from '@/lib/shared_types';

import useActivity from '@/hooks/useActivity';
import UserProfile from '@/components/UserProfile';
import { useMember } from '@/hooks/useMember';

export default function Page() {
  const [followActivities, setFollowActivities] = useState<CardData[]>([]);
  const [hostActivities, setHostActivities] = useState<CardData[]>([]);
  const [joinedActivities, setJoinedActivities] = useState<CardData[]>([]);
  const { getFollowedActivity, getHostedActivity, getJoinedActivity } = useActivity();
  const { follow_activity } = useMember();
  useEffect(() => {
    const fetchData = async () => {
      const followedData = await getFollowedActivity();
      setFollowActivities(followedData);
      const hostedData = await getHostedActivity();
      setHostActivities(hostedData);
      const joinedData = await getJoinedActivity();
      setJoinedActivities(joinedData);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col justify-center bg-gray-100 space-y-6">
      <section>
        <UserProfile></UserProfile>
      </section>
      <section className="space-y-6 pb-10 m-0 sm:m-4 lg:m-10">
        <Container>
          <div className="text-sm lg:text-lg font-semibold">我主持的活動</div>
          {hostActivities && hostActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {hostActivities.map((card) => (
                <Card
                  key={card.activity_id}
                  data={card}
                  follow={follow_activity.some((item) => item.activity_id === card.activity_id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm lg:text-lg font-semibold">目前沒有主持的活動</div>
          )}
        </Container>

        <Container>
          <div className="text-sm lg:text-lg font-semibold">我追蹤的活動</div>
          {followActivities && followActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {followActivities.map((card) => (
                <Card
                  key={card.activity_id}
                  data={card}
                  follow={follow_activity.some((item) => item.activity_id === card.activity_id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm lg:text-lg font-semibold">目前沒有追蹤的活動</div>
          )}
        </Container>

        <Container>
          <div className="text-sm lg:text-lg font-semibold">我參加的活動</div>
          {joinedActivities && joinedActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {joinedActivities.map((card) => (
                <Card
                  key={card.activity_id}
                  data={card}
                  follow={follow_activity.some((item) => item.activity_id === card.activity_id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm lg:text-lg font-semibold">目前沒有參加的活動</div>
          )}
        </Container>
      </section>
    </main>
  );
}
