'use client';
import { useState, useEffect, Dispatch } from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useActivity from '@/hooks/useActivity';
import toast from 'react-hot-toast';

type Participant = {
  member_id: string;
  name: string;
  activity_role: string;
};

type KickParticipantProps = {
  participants: Participant[];
  setParticipants: Dispatch<Participant[]>;
  activityId: string;
  setCapacity: Dispatch<number>;
};

export default function KickParticipant({
  participants,
  setParticipants,
  activityId,
  setCapacity,
}: KickParticipantProps) {
  const { kickMember, getActivityCapacity, getActivityMember } = useActivity();
  const [page, setPage] = useState<number>(1);
  const [showParticipants, setShowParticipants] = useState<Participant[]>();

  const last_page = participants ? Math.ceil(participants.length / 12) : 1;

  function handlePrevClick() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleNextClick() {
    if (page >= last_page) return;
    setPage(page + 1);
  }

  async function handleClick(member_id: string) {
    await kickMember({ member_id, activity_id: activityId });
    const { number_of_participant } = await getActivityCapacity(activityId);
    const people = await getActivityMember(activityId);
    setCapacity(number_of_participant);
    setParticipants(people);
    toast.success('You out 😝');
  }

  useEffect(() => {
    if (!participants) return;
    const start = (page - 1) * 12;
    const end = start + 12;
    setShowParticipants(participants.slice(start, end));
  }, [page, participants]);

  return (
    <Card className="flex flex-col justify-between w-screen max-w-xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 p-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">參與者</CardTitle>
        <CardDescription className="text-gray-700 mt-2">參與者名單，可以踢人</CardDescription>
      </CardHeader>
      <CardContent className="bg-white p-6 space-y-6 flex-grow">
        <div className=" border-gray-200">
          {showParticipants?.map((participant, index) => (
            <div className="flex items-center justify-between my-4" key={index}>
              <span className="text-gray-900">{participant?.name}</span>
              <Button
                className="text-white bg-red-500 hover:bg-red-600"
                onClick={() => handleClick(participant?.member_id)}
              >
                移除
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      {/* card footer should at the bottom */}
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        <Button className="text-white bg-blue-500 hover:bg-blue-600" onClick={handlePrevClick}>
          前一頁
        </Button>
        <span className="text-gray-900">第 {page} 頁</span>
        <Button className="text-white bg-blue-500 hover:bg-blue-600" onClick={handleNextClick}>
          下一頁
        </Button>
      </CardFooter>
    </Card>
  );
}
