'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Logo from '../../../public/logos/Vision5 Logo_O1.svg';
import VisionLogo from '../../../public/logos/vision.svg';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { navItems } from '@/constants/data';

export default function NavigationMenuDemo() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div
      className={cn(
        'w-full px-4 md:px-14 py-3 md:py-6 flex justify-between items-center',
        isHomePage ? 'bg-accent' : 'bg-white'
      )}
    >
      <Link href="/" className="flex-shrink-0">
        <Image
          className="hidden md:block"
          src={Logo}
          width={130}
          height={130}
          alt="Logo"
          priority/>
      
        <Image
          className="block md:hidden"
          src={VisionLogo}
          width={60}
          height={60}
          alt="Logo"
          priority/>
      </Link>

   <div className="flex items-center gap-2 md:gap-10 flex-wrap justify-end">
     <NavigationMenu>
      <NavigationMenuList className="flex flex-wrap gap-1 md:gap-4 text-sm md:text-base">
        <NavigationMenuItem className="flex items-center flex-wrap">
          {navItems.map((navitem) => navitem.link ? (
            <NavigationMenuLink
              asChild className={navigationMenuTriggerStyle() + ' bg-transparent px-1 md:px-2'} key={navitem.title}>
                    <Link href={navitem.href}>{navitem.title}</Link>
            </NavigationMenuLink>
            ) : (
              <div key={navitem.title}>
                <NavigationMenuTrigger className="bg-transparent text-sm md:text-base px-1 md:px-2">
                 {navitem.title}
                  </NavigationMenuTrigger>
                    <NavigationMenuContent>
                     <ul className="grid w-[230px] gap-3 p-4 md:grid-cols-1 lg:w-[350px] ">                       {navitem.components.map((component: any) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}>
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
    <Button variant="default" className="text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 h-auto min-w-fit">
      <Link href="/contact-us">Contact Us</Link>
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
        <a ref={ref} className={cn( 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', className )}
          {...props} >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-primary">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';