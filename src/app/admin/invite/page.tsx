'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, Loader2, AlertCircle
} from 'lucide-react';
import { useInviteAdmin } from '@/hooks/useInviteAdmin';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminPageHeader } from '@/components/layout/admin-page-header';

function InviteAdminPage() {
  const router = useRouter();
  const { mutate: inviteAdmin, isPending } = useInviteAdmin();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});

    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    inviteAdmin(
      { email: email.trim() },
      {
        onSuccess: () => {
          setEmail('');
          setErrors({});
        },
      }
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
          <AdminPageHeader
            tag="Team"
            title="Invite Admin"
            description="Send an invitation to a new admin user."
          />
          </div>

          {/* Form */}
          <div className="bg-white rounded-md p-6 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-800 font-semibold mb-2 block">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors({ ...errors, email: undefined });
                      }
                    }}
                    placeholder="admin@example.com"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isPending}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  size="lg"
                >
                  {isPending ? (
                    <>
                      <Loader2 size={18} className="animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Invitation'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/jobs')}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default InviteAdminPage;

