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
  FaUser,
  FaBriefcase,
  FaHeart,
} from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';

import CategoryBox from '../CategoryBox';
import Container from '../Container';

export const mainPageCategories = [
  {
    label: '瀏覽全部',
    icon: FaList,
    href: '/events?category=all',
    type: 'all',
  },
  {
    label: '找打工',
    icon: FaBriefcase,
    href: '/events?category=work',
    type: 'work',
  },
  {
    label: '演講',
    icon: CiMicrophoneOn,
    href: '/events?category=lecture',
    type: 'lecture',
  },
  {
    label: '影音觀賞',
    icon: MdMovie,
    href: '/events?category=video',
    type: 'video',
  },
  {
    label: '工作坊',
    icon: FaTools,
    href: '/events?category=workshop',
    type: 'workshop',
  },
  {
    label: '聯誼',
    icon: FaUsers,
    href: '/events?category=fellowship',
    type: 'fellowship',
  },
  {
    label: '語言交換',
    icon: FaLanguage,
    href: '/events?category=languages',
    type: 'languages',
  },
  {
    label: '運動',
    icon: FaRunning,
    href: '/events?category=sport',
    type: 'sport',
  },
  {
    label: '戶外活動',
    icon: FaTree,
    href: '/events?category=activity',
    type: 'activity',
  },
  {
    label: '遊戲',
    icon: FaGamepad,
    href: '/events?category=game',
    type: 'game',
  },
  {
    label: '考試',
    icon: FaPencilAlt,
    href: '/events?category=exam',
    type: 'exam',
  },
  {
    label: '讀書會',
    icon: FaBook,
    href: '/events?category=study',
    type: 'study',
  },
  {
    label: '其他',
    icon: CiMicrophoneOn,
    href: '/events?category=other',
    type: 'other',
  },
];

export const userActivityCategories = [
  {
    label: '我的活動',
    icon: FaUser,
    href: '/new_user?category=userActivity',
    type: 'userActivity',
  },
  {
    label: '我的打工',
    icon: FaBriefcase,
    href: '/new_user?category=userWork',
    type: 'userWork',
  },
  {
    label: '追蹤中',
    icon: FaHeart,
    href: '/new_user?category=userLike',
    type: 'userLike',
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/' || pathname === '/events' || pathname === '/search';
  const isUserPage = pathname === '/new_user';
  if (!isMainPage && !isUserPage) {
    return null;
  }

  return isMainPage ? (
    <Container>
      <div className="pt-4 flex flex-row items-start md:items-center justify-between overflow-x-auto">
        {mainPageCategories.map((item) => (
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
  ) : (
    <Container>
      <div className="pt-4 flex flex-row items-start md:items-center justify-start overflow-x-auto space-x-4">
        {userActivityCategories.map((item) => (
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

export default Categories;
