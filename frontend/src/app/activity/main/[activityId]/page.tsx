'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import useActivity from '@/hooks/useActivity';
import { useMember } from '@/hooks/useMember';

import KickParticipant from '@/components/KickParticipant';
import Rating from '@/components/Rating';
import ActivityCard from '@/components/ActivityCard';

import type { ActivityData } from '@/lib/shared_types';

type Participant = {
  member_id: string;
  name: string;
  activity_role: string;
};

type Activity = ActivityData & {
  member_id: string;
  name: string;
};

type Comment = {
  comment: string;
  member_id: string;
  activity_id: string;
  score: number;
};

type Identity = 'Host' | 'Participant' | '';

export default function Page({ params }: { params: { activityId: string } }) {
  const router = useRouter();
  const {
    getActivityById,
    getActivityCapacity,
    getActivityComments,
    getActivityRating,
    getActivityMember,
    deleteActivity,
    quitActivity,
    joinActivity,
  } = useActivity();
  const { member } = useMember();

  const [activity, setActivity] = useState<Activity>();
  const [capacity, setCapacity] = useState<number>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [identity, setIdentity] = useState<Identity>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const status = useCallback(() => {
    if (!activity) return;
    const now = new Date();
    const eventStart = new Date(activity.event_start_timestamp);
    const eventEnd = new Date(activity.event_end_timestamp);
    const registrationStart = new Date(activity.register_start_timestamp);
    const registrationEnd = new Date(activity.register_end_timestamp);

    if (activity?.status === 'cancel') return '已刪除';
    if (now < registrationStart) return '即將開始註冊';
    if (now > registrationStart && now < registrationEnd) return '註冊中';
    if (now > registrationEnd && now < eventStart) return '即將開始活動';
    if (now > eventStart && now < eventEnd) return '進行中';
    if (now > eventEnd) return '已結束';
  }, [activity]);

  useEffect(() => {
    const fetchActivity = async () => {
      const activity = await getActivityById(params.activityId);
      const { number_of_participant } = await getActivityCapacity(params.activityId);
      const comment = await getActivityComments(params.activityId);
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

  useEffect(() => {
    if (participants && member && activity) {
      if (member?.member_id === activity?.member_id) {
        setIdentity('Host');
      } else if (participants.find((p) => p.member_id === member?.member_id)) {
        setIdentity('Participant');
      } else {
        setIdentity('');
      }
      setIsLoading(false);
    }
  }, [participants, member, activity]);

  const handleClick = async () => {
    setIsLoading(true);
    if (identity === 'Host' && activity) {
      await deleteActivity(activity.activity_id);
      if (member) toast.success('活動已刪除');
      router.push('/');
    } else if (identity === 'Participant' && activity) {
      await quitActivity(activity.activity_id);
      const { number_of_participant } = await getActivityCapacity(params.activityId);
      const people = await getActivityMember(params.activityId);
      setCapacity(number_of_participant);
      setParticipants(people);
      if (member) toast.success('已退出活動');
    } else if (identity === '' && activity) {
      const url = await joinActivity(activity.activity_id);
      // console.log(url);
      window.location.replace(url);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center">
      <ActivityCard
        activity={activity}
        capacity={capacity}
        comments={comments}
        status={status}
        rating={rating}
        handleClick={handleClick}
        identity={identity}
        isLoading={isLoading}
      />
      {member?.member_id === activity?.member_id && member?.member_id != undefined && (
        <KickParticipant
          participants={participants}
          setParticipants={setParticipants}
          activityId={params.activityId}
          setCapacity={setCapacity}
        />
      )}
      {member?.member_id !== activity?.member_id &&
        member?.member_id != undefined &&
        activity?.member_id != undefined &&
        activity?.status !== 'cancel' &&
        (status() === '已結束' || status() === '進行中') && (
          <Rating activityId={params.activityId} comments={comments} setComments={setComments} />
        )}
    </div>
  );
}
