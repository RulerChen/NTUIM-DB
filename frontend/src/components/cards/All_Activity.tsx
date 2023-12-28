import type { CardData } from '@/lib/shared_types';

interface AllActivityProps {
  data: CardData;
  count: number;
  onDelete: (activity_id: string) => void;
}

const All_Activity = ({ data, count, onDelete }: AllActivityProps) => {
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
          <p className="text-sm leading-6 text-gray-900">{count}人參加</p>
        </div>
        <button onClick={() => onDelete(data.activity_id)}>刪除</button>
      </li>
    </ul>
  );
};

export default All_Activity;
