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
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          shadcn/ui
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and
                          paste into your apps. Accessible. Customizable. Open
                          Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem
                    href="/docs/primitives/typography"
                    title="Typography"
                  >
                    Styles for headings, paragraphs, lists...etc
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
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
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
