'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '../../../public/logos/Vision5 Logo_O1.svg';
import VisionLogo from '../../../public/logos/vision.svg';

import { cn } from '@/lib/utils';
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '../ui/button';
import { navItems } from '@/constants/data';
import PageContainer from './page-container';

export default function NavigationMenuDemo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  return (
    <div className={cn(
      "flex justify-between items-center w-full p-4 md:px-14 md:py-7",
      isHomePage ? "bg-accent" : "bg-white"
    )}>
      <Link href={'/'}>
        <Image className=' hidden md:block' src={Logo} width={110} height={110} alt="Logo" />
        <Image className='md:hidden' src={VisionLogo} width={110} height={110} alt="Logo" />
      </Link>
      <div className="flex gap-10">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className='flex items-center'>
              {navItems.map((navitem) =>
                navitem.link ? (
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle() + ' bg-transparent'} key={navitem.title}>
  <Link href={navitem.href}>
    {navitem.title}
  </Link>
</NavigationMenuLink>

                ) : (
                  <div key={navitem.title}>
                    <NavigationMenuTrigger className='bg-transparent'>
                      {navitem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1 lg:w-[350px] ">
                        {navitem.components.map((component: any) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </div>
                )
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button variant={'default'}>
          <Link href={'/contact-us'}>Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
