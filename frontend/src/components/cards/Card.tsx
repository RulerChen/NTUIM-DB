'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import HeartButton from '../HeartButton';

import type { CardData } from '@/lib/shared_types';
// import { FaLocationDot } from 'react-icons/fa6';

interface CardProps {
  data: CardData;
  follow?: boolean;
}

const Card = ({ data, follow }: CardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/activity/main/${data.activity_id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-0 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-slate-400">
          {/* TODO: activity image src */}
          <Image
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.img_url}
            alt="Listing"
            priority
          />
          <div className="absolute top-3 right-3">
            <HeartButton id={data.activity_id} isFollow={follow} />
          </div>
        </div>
        <div className="font-light text-neutral-500">
          {data.activity_tag === '' ? '#tag' : `#${data.activity_tag}`}
        </div>
        <div className="font-semibold text-2xl">{data.title}</div>
        <div className="font-semibold text-sm">{`活動時間: ${
          new Date(data.event_start_timestamp).getMonth() + 1
        }/${new Date(data.event_start_timestamp).getDate()}~${
          new Date(data.event_end_timestamp).getMonth() + 1
        }/${new Date(data.event_start_timestamp).getDate()}`}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold text-base">
            {data.activity_tag === 'work'
              ? '薪資: $ todo'
              : data.student_fee == 0
              ? '免費參加'
              : '費用: $' + data.student_fee}
            {/* {data.student_fee == 0 ? '免費參加' : '費用: $' + data.student_fee} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
