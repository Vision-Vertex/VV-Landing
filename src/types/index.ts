// import { Icons } from '@/components/icons';

import { StaticImageData } from "next/image";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  components?: Array;
  link: Boolean;
}
export interface PartnerItem {
  path: any;
  alt: string;
  link?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface Card {
  icon: any;
  title: string;
  description: string;
}
export interface Services {
  icon: any;
  headline: string;
  slug: string;
  small_description: string;
  description: string;
  button1: string;
  button2?: string;
  partners?: PartnerItem[];
  image: any;
  second_headline: string;
  second_description: string;
  cards: Card[];
}
export interface Stats {
  icon: any;
  number: number;
  name: string;
}

export interface Testmonial{
  quote: string;
  name: string;
  icon?: any;
  image: StaticImageData
}

export interface CompanyValues {
  title: string;
  small_description: string;
  description: string;
}

export interface Team {
  image: any;
  position: string;
  name: string;
  linkedin: string;
  email: string;
}


export interface ServiceProps {
  params: { slug: string };
};

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
