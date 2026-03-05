const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;
  private refreshPromise: Promise<LoginResponse> | null = null; // Prevent concurrent refresh calls

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  private isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    
    try {
      // If token is JWT, decode and check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        return Date.now() >= payload.exp * 1000;
      }
    } catch {
      // Not a JWT or can't decode, assume valid if exists
      return false;
    }
    return false;
  }

  // Get token with automatic refresh if expired
  async getValidToken(): Promise<string | null> {
    const token = this.getToken();
    if (!token) return null;

    // Check if token is expired
    if (this.isTokenExpired(token)) {
      try {
        await this.refreshToken();
        return this.getToken();
      } catch (error) {
        this.logout();
        return null;
      }
    }

    return token;
  }

  async refreshToken(): Promise<LoginResponse> {
    // If refresh is already in progress, return the existing promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw { message: 'No refresh token available', status: 401 } as ApiError;
    }

    // Create refresh promise
    this.refreshPromise = (async () => {
      try {
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        const response = await fetch(`${this.baseURL}/auth/refresh`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: response.statusText || 'Token refresh failed',
          }));
          throw {
            message: errorData.message || errorData.detail || 'Token refresh failed',
            status: response.status,
          } as ApiError;
        }

        const data = await response.json();

        if (data.access_token) {
          this.setToken(data.access_token);
          if (data.refresh_token) {
            this.setRefreshToken(data.refresh_token);
          }
        }

        return data;
      } finally {
        // Clear the promise after completion
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryOn401: boolean = true
  ): Promise<T> {
    // Get valid token (will refresh if expired)
    const token = await this.getValidToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (response.status === 401 && retryOn401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
        try {
          await this.refreshToken();
          // Retry the original request with new token
          return this.request<T>(endpoint, options, false); // Don't retry again
        } catch (refreshError) {
          // Refresh failed, clear tokens and throw error
          this.logout();
          throw {
            message: 'Session expired. Please login again.',
            status: 401,
          } as ApiError;
        }
      }

      // Get response body (but don't parse yet, in case of error)
      const responseText = await response.clone().text();
      let responseData: any;
      
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      if (!response.ok) {
        throw {
          message: responseData.message || responseData.detail || responseData.error || 'An error occurred',
          status: response.status,
        } as ApiError;
      }

      return responseData as T;
    } catch (error) {

      if (error && typeof error === 'object' && 'message' in error) {
        throw error;
      }
      throw {
        message: 'Network error. Please check your connection.',
        status: 0,
      } as ApiError;
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.access_token) {
      this.setToken(response.access_token);
      if (response.refresh_token) {
        this.setRefreshToken(response.refresh_token);
      }
    }

    return response;
  }


  logout() {
    // Clear tokens
    this.removeToken();
    this.removeRefreshToken();
    
    // Verify tokens are cleared
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();
    
    if (token || refreshToken) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Clear any other potential auth-related items
        localStorage.removeItem('token');
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  }

  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  private setRefreshToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', token);
    }
  }

  private removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  private removeRefreshToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refresh_token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Setup automatic token refresh before expiration
  setupAutoRefresh(): void {
    if (typeof window === 'undefined') return;

    // Check token every 5 minutes
    setInterval(async () => {
      const token = this.getToken();
      if (token && this.isTokenExpired(token)) {
        try {
          await this.refreshToken();
        } catch (error) {
          this.logout();
        }
      }
    }, 5 * 60 * 1000); // 5 minutes
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

