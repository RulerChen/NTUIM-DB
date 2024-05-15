"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { CiMicrophoneOn } from "react-icons/ci";
import {
  FaPencilAlt,
  FaList,
  FaTools,
  FaUsers,
  FaLanguage,
  FaRunning,
  FaTree,
  FaGamepad,
  FaBook,
} from "react-icons/fa";
import { MdMovie } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "瀏覽全部",
    icon: FaList,
    href: "/events?category=all",
    type: "all",
  },
  {
    label: "追蹤中",
    icon: FaRunning,
    href: "/events?category=all",
    type: "activity",
  },
  {
    label: "已參加",
    icon: FaTree,
    href: "/events?category=all",
    type: "job",
  },
  {
    label: "我舉辦的活動",
    icon: FaTools,
    href: "/events?category=all",
    type: "job",
  },
];

const UserCategories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  return (
    <Container>
      <div className="pt-4 flex flex-row items-start md:items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            selected={category === item.type}
          />
        ))}
      </div>
    </Container>
  );
};

export default UserCategories;
