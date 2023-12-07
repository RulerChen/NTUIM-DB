'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { CiMicrophoneOn } from 'react-icons/ci';
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
} from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

export const categories = [
  {
    label: '瀏覽全部',
    icon: FaList,
    href: '/events',
  },
  {
    label: '演講',
    icon: CiMicrophoneOn,
    href: '/events?category=演講',
  },
  {
    label: '影音觀賞',
    icon: MdMovie,
    href: '/events?category=影音觀賞',
  },
  {
    label: '工作坊',
    icon: FaTools,
    href: '/events?category=工作坊',
  },
  {
    label: '聯誼',
    icon: FaUsers,
    href: '/events?category=聯誼',
  },
  {
    label: '語言交換',
    icon: FaLanguage,
    href: '/events?category=語言交換',
  },
  {
    label: '運動',
    icon: FaRunning,
    href: '/events?category=運動',
  },
  {
    label: '戶外活動',
    icon: FaTree,
    href: '/events?category=戶外活動',
  },
  {
    label: '遊戲',
    icon: FaGamepad,
    href: '/events?category=遊戲',
  },
  {
    label: '考試',
    icon: FaPencilAlt,
    href: '/events?category=考試',
  },
  {
    label: '讀書會',
    icon: FaBook,
    href: '/events?category=讀書會',
  },
  {
    label: '其他',
    icon: CiMicrophoneOn,
    href: '/events?category=其他',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={item.href}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
