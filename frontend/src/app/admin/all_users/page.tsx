'use client';
import type { MemberData } from '@/lib/shared_types';
import useActivity from '@/hooks/useActivity';
import { useState, useEffect } from 'react';
import All_User from '@/components/cards/All_User';

export default function Page() {
  const { getAllMember } = useActivity();
  const [memberData, setMemberData] = useState<MemberData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getAllMember();
      setMemberData(newData);
    };

    fetchData();
  }, [getAllMember]);

  return (
    <main className="flex flex-col justify-center min-h-full bg-gray-100 sm:p-5 lg:p-10 space-y-10">
      {memberData?.map((data) => <All_User key={data.member_id} data={data} />)}
    </main>
  );
}
