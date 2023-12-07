'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const eventCatogories: { title: string; href: string; description: string }[] = [
  {
    title: '演講',
    href: '/events?category=演講',
    description: '演講',
  },
  {
    title: '影音觀賞',
    href: '/events?category=影音觀賞',
    description: '影音觀賞',
  },
  {
    title: '工作坊',
    href: '/events?category=工作坊',
    description: '工作坊',
  },
  {
    title: '聯誼',
    href: '/events?category=聯誼',
    description: '聯誼',
  },
  {
    title: '語言交換',
    href: '/events?category=語言交換',
    description: '語言交換',
  },
  {
    title: '運動',
    href: '/events?category=運動',
    description: '運動',
  },
  {
    title: '戶外',
    href: '/events?category=戶外',
    description: '戶外',
  },
  {
    title: '瀏覽全部',
    href: '/events',
    description: '瀏覽全部',
  },
];

const userCatogories: { title: string; href: string; description: string }[] = [
  {
    title: '修改個人資料',
    href: '/user/profile',
    description: '修改個人資料',
  },
  {
    title: '我還沒想好還要放甚麼',
    href: '/user?category=修改個人資料',
    description: '修改個人資料',
  },
  {
    title: '進入會員中心',
    href: '/user/profile',
    description: '進入會員中心',
  },
];

const MainHeaderBar = () => {
  return (
    <>
      <NavigationMenu className="flex flex-row justify-center py-4 px-2">
        <NavigationMenuList>
          <Link href="/events" legacyBehavior passHref>
            <NavigationMenuItem className="rounded-lg hover:border-b-4 hover:bg-gray-200 hover:border-cyan-100">
              <NavigationMenuTrigger>活動類別</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {eventCatogories.map(({ title, href, description }) => (
                    <ListItem
                      key={title}
                      title={title}
                      href={href}
                      className="rounded-lg bg-gray-100"
                    >
                      {description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </Link>
          <Link href="/user/profile" legacyBehavior passHref>
            <NavigationMenuItem className="rounded-lg hover:border-b-4 hover:bg-gray-200 hover:border-cyan-100">
              <NavigationMenuTrigger>會員中心</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {userCatogories.map(({ title, href, description }) => (
                    <ListItem
                      key={title}
                      title={title}
                      href={href}
                      className="rounded-lg bg-gray-100"
                    >
                      {description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default MainHeaderBar;

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
