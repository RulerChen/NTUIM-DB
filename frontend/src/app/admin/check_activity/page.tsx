'use client';

import type { CardData } from '@/lib/shared_types';
import useActivity from '@/hooks/useActivity';
import { useState} from 'react';


export default function Page() {
  const { getAllActivity, deleteActivity } = useActivity();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const fetchData = async () => {
    const data = await getAllActivity('all');
    setCardData(data);
  };
  fetchData();
    return (
      <main className="flex flex-col justify-center min-h-full bg-gray-100 sm:p-5 lg:p-10 space-y-10">
                              <ul role="list" className="divide-y divide-gray-100">
                      <li className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">activity title</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">description</p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">參加人數</p>
                        </div>
                        <button>刪除</button>
                      </li>
                    </ul>
        {cardData?.map((data) => (
                      <ul role="list" className="divide-y divide-gray-100">
                      <li className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{data.title}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.description}</p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">參加人數</p>
                        </div>
                        <button onClick={() => deleteActivity(data.id)}>刪除</button>
                      </li>
                    </ul>
        ))}
      </main>
    );
  }