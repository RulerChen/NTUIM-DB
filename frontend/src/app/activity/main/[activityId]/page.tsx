'use client';
import { useState, useEffect, useCallback } from 'react';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';

import KickParticipant from '@/components/KickParticipant';
import Rating from '@/components/Rating';
import ActivityCard from '@/components/ActivityCard';

type Activity = {
  activity_id: string;
  title: string;
  description: string;
  event_start_timestamp: Date;
  event_end_timestamp: Date;
  register_start_timestamp: Date;
  register_end_timestamp: Date;
  location: string;
  capacity: number;
  student_fee: number;
  non_student_fee: number;
  activity_tag: string;
  name: string;
  member_id: string;
};

type Participant = {
  member_id: string;
  name: string;
  activity_role: string;
};

export default function Page({ params }: { params: { activityId: string } }) {
  const {
    getActivityById,
    getActivityCapacity,
    getActivityComments,
    getActivityRating,
    getActivityMember,
  } = useActivity();
  const { member } = useMember();

  const [activity, setActivity] = useState<Activity>();
  const [capacity, setCapacity] = useState<number>();
  const [comments, setComments] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const status = useCallback(() => {
    if (!activity) return;
    const now = new Date();
    const eventStart = new Date(activity.event_start_timestamp);
    const eventEnd = new Date(activity.event_end_timestamp);
    const registrationStart = new Date(activity.register_start_timestamp);
    const registrationEnd = new Date(activity.register_end_timestamp);

    if (now < registrationStart) return '即將開始註冊';
    if (now > registrationStart && now < registrationEnd) return '註冊中';
    if (capacity === 0) return '已額滿';
    if (now > registrationEnd && now < eventStart) return '即將開始活動';
    if (now > eventStart && now < eventEnd) return '進行中';
    if (now > eventEnd) return '結束';
  }, [activity, capacity]);

  useEffect(() => {
    const fetchActivity = async () => {
      const activity = await getActivityById(params.activityId);
      const { number_of_participant } = await getActivityCapacity(params.activityId);
      const { comment } = await getActivityComments(params.activityId);
      const { average_score } = await getActivityRating(params.activityId);
      const people = await getActivityMember(params.activityId);

      setActivity(activity);
      setCapacity(number_of_participant);
      setComments(comment);
      setRating(average_score);
      setParticipants(people);
    };
    fetchActivity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.activityId]);

  return (
    <div className="flex flex-wrap justify-center">
      <ActivityCard
        activity={activity}
        capacity={capacity}
        comments={comments}
        status={status}
        rating={rating}
        isHost={member?.member_id === activity?.member_id}
        participants={participants}
      />
      {member?.member_id === activity?.member_id && <KickParticipant participants={participants} />}
      {member?.member_id !== activity?.member_id && status() === '結束' && <Rating />}
    </div>
  );
}
