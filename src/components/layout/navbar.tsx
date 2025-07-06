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
import { Button } from '../ui/button';
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
                      <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                       {navitem.components.map((component: any) => (
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';


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