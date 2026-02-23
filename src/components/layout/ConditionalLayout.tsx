'use client';

import { usePathname } from 'next/navigation';
import NavBar from './navbar';
import Footer from './footer';
import AdminNavbar from './admin-navbar';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === '/auth/login';

  return (
    <>
      {!hideLayout && (pathname?.startsWith('/admin') ? <AdminNavbar /> : <NavBar />)}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

