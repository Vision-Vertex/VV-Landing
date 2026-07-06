'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Briefcase, Plus, UserPlus, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Logo from '../../../public/logos/VisionVertexLogo1.svg';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear all React Query cache
    queryClient.clear();
    
    // Logout (clears tokens and redirects)
    logout();
  };

  return (
    <div className="flex justify-between items-center w-full md:px-14 relative z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Left Side: Logo */}
      <Link href={'/admin'} className="shrink-0">
        <Image className="w-[110px] h-[110px]" src={Logo} width={100} height={100} alt="Logo" />
      </Link>
      
      {/* Desktop Navigation (Right Side) */}
      <div className="hidden md:flex items-center gap-6">
        {/* Jobs Link */}
        <Link
          href="/admin/jobs"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            pathname === '/admin/jobs' || pathname === '/admin/jobs/create'
              ? "bg-primary/10 text-primary" 
              : "text-gray-600 hover:text-primary hover:bg-gray-50"
          )}
        >
          <Briefcase size={18} />
          Jobs
        </Link>

        {/* Invite Admin Link */}
        <Link
          href="/admin/invite"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            pathname === '/admin/invite'
              ? "bg-primary/10 text-primary" 
              : "text-gray-600 hover:text-primary hover:bg-gray-50"
          )}
        >
          <UserPlus size={18} />
          Invite Admin
        </Link>

        {/* Profile Link */}
        <Link
          href="/admin/profile"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            pathname === '/admin/profile'
              ? "bg-primary/10 text-primary" 
              : "text-gray-600 hover:text-primary hover:bg-gray-50"
          )}
        >
          <User size={18} />
          Profile
        </Link>

        {/* Create Job Button */}
        <Button asChild className="px-3 py-1.5 h-auto text-xs font-medium">
          <Link href={'/admin/jobs/create'} className="flex items-center gap-1.5">
            <Plus size={14} />
            Create Job
          </Link>
        </Button>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-800 hover:text-primary transition-colors duration-200 p-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Dropdown */}
      <div
        className={cn(
          "absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl md:hidden overflow-hidden z-[100] transition-all duration-300",
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="p-6 space-y-6">
          {/* Mobile Links */}
          <div className="space-y-2">
            <Link
              href="/admin/jobs"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors duration-200",
                pathname === '/admin/jobs' || pathname === '/admin/jobs/create'
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <Briefcase size={20} className={pathname === '/admin/jobs' ? "text-primary" : "text-gray-400"} />
              Jobs
            </Link>
            <Link
              href="/admin/invite"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors duration-200",
                pathname === '/admin/invite'
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <UserPlus size={20} className={pathname === '/admin/invite' ? "text-primary" : "text-gray-400"} />
              Invite Admin
            </Link>
            <Link
              href="/admin/profile"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-colors duration-200",
                pathname === '/admin/profile'
                  ? "bg-primary/10 text-primary font-semibold" 
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <User size={20} className={pathname === '/admin/profile' ? "text-primary" : "text-gray-400"} />
              Profile
            </Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <Button
              asChild
              className="w-full px-3 py-1.5 h-auto text-xs font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={'/admin/jobs/create'} className="flex items-center justify-center gap-1.5">
                <Plus size={14} />
                Create Job
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}