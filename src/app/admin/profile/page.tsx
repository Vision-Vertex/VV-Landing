'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, User, Mail, Building2, Shield, Calendar, 
  Loader2, AlertCircle, LogOut
} from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { data: profile, isLoading, error } = useUserProfile();

  const handleLogout = () => {
    // Clear all React Query cache
    queryClient.clear();
    
    // Logout (clears tokens and redirects)
    logout();
    
    toast.success('Logged out successfully');
  };

  const formatRole = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !profile) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
          <div className="text-center">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to load profile</h2>
            <p className="text-gray-600 mb-6">
              {(error as any)?.message || 'Unable to load your profile. Please try again.'}
            </p>
            <Button onClick={() => router.push('/admin/jobs')}>
              <ArrowLeft size={18} className="mr-2" />
              Back to Jobs
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-gray-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 px-6 md:px-16 py-10">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/admin/jobs">
              <Button variant="outline" className="gap-2 mb-6">
                <ArrowLeft size={18} />
                Back to Jobs
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <User className="text-primary" size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                My Profile
              </h1>
            </div>
            <p className="text-gray-600">
              View and manage your account information.
            </p>
          </motion.div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Profile Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Full Name</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <User className="text-primary" size={20} />
                    <span className="text-gray-900 font-medium">
                      {profile.first_name && profile.last_name
                        ? `${profile.first_name} ${profile.last_name}`
                        : profile.first_name || profile.last_name || 'Not set'}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Email Address</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Mail className="text-primary" size={20} />
                    <span className="text-gray-900">{profile.email}</span>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Role</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <Shield className="text-secondary" size={20} />
                    <span className="text-gray-900 font-medium capitalize">
                      {formatRole(profile.role)}
                    </span>
                  </div>
                </div>

                {/* Account Status */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Account Status</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className={`w-3 h-3 rounded-full ${profile.is_active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-gray-900 font-medium">
                      {profile.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Account Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Member Since</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <Calendar className="text-primary" size={18} />
                      <span className="text-gray-900 text-sm">
                        {new Date(profile.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Last Updated</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <Calendar className="text-primary" size={18} />
                      <span className="text-gray-900 text-sm">
                        {new Date(profile.updated_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Info Card */}
            {profile.company && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Company Name</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <Building2 className="text-secondary" size={20} />
                      <span className="text-gray-900 font-medium">{profile.company.name}</span>
                    </div>
                  </div>

                  {profile.company.email && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-2 block">Company Email</label>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-900 text-sm">{profile.company.email}</span>
                      </div>
                    </div>
                  )}

                  {profile.company.website && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-2 block">Website</label>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <a 
                          href={profile.company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary text-sm"
                        >
                          {profile.company.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {profile.company.industry && (
                    <div>
                      <label className="text-sm font-semibold text-gray-600 mb-2 block">Industry</label>
                      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-gray-900 text-sm capitalize">{profile.company.industry}</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default ProfilePage;

