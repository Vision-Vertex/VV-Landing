'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, Lock, User, Loader2, AlertCircle, CheckCircle2, 
  Eye, EyeOff, ArrowRight, Building2
} from 'lucide-react';
import { useValidateInvitation, useAcceptInvitation } from '@/hooks/useAcceptInvitation';
import { toast } from 'sonner';

function AcceptInvitationPage() {
  const params = useParams();
  const router = useRouter();
  // Decode the token from URL (it might be URL encoded)
  const token = params.token ? decodeURIComponent(params.token as string) : '';
  
  const { data: validationData, isLoading: isValidating, error: validationError } = useValidateInvitation(token);
  const { mutate: acceptInvitation, isPending: isAccepting } = useAcceptInvitation();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (validationError) {
      toast.error('Invalid invitation', {
        description: (validationError as any)?.message || 'This invitation link is invalid or has expired.',
      });
    }
  }, [validationError]);

  const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters and contain uppercase, lowercase, and number
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and contain uppercase, lowercase, and number';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    acceptInvitation(
      {
        token,
        data: {
          first_name: formData.first_name.trim(),
          last_name: formData.last_name.trim(),
          password: formData.password,
        },
      },
      {
        onSuccess: () => {
          // Redirect to login page after a short delay
          setTimeout(() => {
            router.push('/auth/login');
          }, 2000);
        },
      }
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Loading state
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin text-primary mx-auto mb-4" size={32} />
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  // Invalid invitation
  if (!validationData?.valid || !validationData?.invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Invitation</h1>
          <p className="text-gray-600 mb-6">
            {validationData?.message || 'This invitation link is invalid, expired, or has already been used.'}
          </p>
          <Button asChild>
            <Link href="/auth/login">Go to Login</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const invitation = validationData.invitation;

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-secondary/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 py-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 max-w-2xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-primary" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accept Invitation</h1>
            <p className="text-gray-600">
              Complete your account setup to join Vision Vertex Admin
            </p>
          </div>

          {/* Invitation Info */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 mb-8 border border-primary/10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-primary" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{invitation.email}</p>
                </div>
              </div>
              {invitation.company && (
                <div className="flex items-center gap-3">
                  <Building2 className="text-secondary" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-semibold text-gray-900">{invitation.company.name}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <User className="text-primary" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="font-semibold text-gray-900 capitalize">{invitation.role.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="first_name" className="text-gray-800 font-semibold mb-2 block text-sm">
                  First Name *
                </Label>
                <Input
                  id="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  placeholder="John"
                  className={errors.first_name ? 'border-red-500' : ''}
                  disabled={isAccepting}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.first_name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name" className="text-gray-800 font-semibold mb-2 block text-sm">
                  Last Name *
                </Label>
                <Input
                  id="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  placeholder="Doe"
                  className={errors.last_name ? 'border-red-500' : ''}
                  disabled={isAccepting}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-800 font-semibold mb-2 block text-sm">
                Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className={`pl-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                  disabled={isAccepting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.password}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                Must be at least 8 characters and contain uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <Label htmlFor="confirm_password" className="text-gray-800 font-semibold mb-2 block text-sm">
                Confirm Password *
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="confirm_password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirm_password}
                  onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                  placeholder="Confirm your password"
                  className={`pl-12 pr-12 ${errors.confirm_password ? 'border-red-500' : ''}`}
                  disabled={isAccepting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isAccepting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 gap-2"
              >
                {isAccepting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Accept Invitation
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:text-secondary font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AcceptInvitationPage;

