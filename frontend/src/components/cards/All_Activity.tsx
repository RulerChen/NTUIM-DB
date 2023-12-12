'use client';

import type { CardData } from '@/lib/shared_types';

interface CardProps {
  data: CardData;
}

const All_Activity = ({ data }: CardProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{data.title}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{data.description}</p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900"></p>
        </div>
        <button>刪除</button>
      </li>
    </ul>
  );
};

export default All_Activity;
