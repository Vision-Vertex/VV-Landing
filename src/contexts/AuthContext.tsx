'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient, LoginCredentials, LoginResponse, ApiError } from '@/lib/api';

interface AuthContextType {
  user: LoginResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if user is authenticated on mount and refresh token if needed
    const checkAuth = async () => {
      try {
        const token = apiClient.getToken();
        const refreshToken = apiClient.getRefreshToken();

        if (token && refreshToken) {
          // Check if token is expired and refresh if needed
          try {
            // Try to get a valid token (will auto-refresh if expired)
            const validToken = await apiClient.getValidToken();
            
            if (validToken) {
              // Token is valid, user is authenticated
            } else {
              // Token refresh failed
            }
          } catch (error) {
            // Token refresh failed, user needs to login
          }
        }
      } catch (error) {
        // Auth check error
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    
    // Setup automatic token refresh
    apiClient.setupAutoRefresh();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await apiClient.login(credentials);
      setUser(response.user || null);
      router.push('/admin/jobs'); // Redirect to admin jobs page after login
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear all React Query cache first
    queryClient.clear();
    
    // Clear tokens
    apiClient.logout();
    
    // Clear user state
    setUser(null);
    setError(null);
    
    // Verify tokens are cleared
    const token = apiClient.getToken();
    const refreshToken = apiClient.getRefreshToken();
    
    if (token || refreshToken) {
      // Force clear again - remove all possible token variations
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('token');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
    
    // Redirect to login
    router.push('/auth/login');
    router.refresh(); // Force refresh to clear any cached state
  };

  // Handle automatic logout on 401 errors
  useEffect(() => {
    const handleStorageChange = () => {
      const token = apiClient.getToken();
      if (!token && user) {
        // Token was removed (e.g., by apiClient on 401)
        setUser(null);
        router.push('/auth/login');
      }
    };

    // Listen for storage changes (in case token is cleared in another tab)
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: apiClient.isAuthenticated(),
        isLoading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

