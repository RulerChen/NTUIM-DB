"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartButton from "../HeartButton";

import type { CardData } from "@/lib/shared_types";
import { FaLocationDot } from "react-icons/fa6";

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
            src={"/images/test.png"}
            alt="Listing"
            priority
          />
          <div className="absolute top-3 right-3">
            <HeartButton id={data.activity_id} isFollow={follow} />
          </div>
        </div>
        <div className="font-light text-neutral-500">
          {data.activity_tag == "" ? "#tag" : data.activity_tag}
        </div>
        <div className="font-semibold text-2xl">{data.title}</div>
        <div className="flex items-center text-gray-400">
          <FaLocationDot className="mr-1" />
          <div className="flex items-center text-sm text-gray-500">
            <div className="mr-2">{data.location}</div>
          </div>
          <div className="text-xs text-gray-500">尚餘名額: {data.capacity}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
