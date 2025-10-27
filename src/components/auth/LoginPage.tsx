import React from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Shield } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

export function LoginPage({ onLogin, isLoading }: LoginPageProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();
    
    try {
      await onLogin(data.email, data.password);
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'Invalid email or password'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-[#15803D] rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-[#374151] mb-2">Church Admin Portal</h1>
          <p className="text-[#6B7280] text-sm">Sign in to manage your church website</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.root && (
              <div className="bg-red-50 border border-[#EF4444] text-[#EF4444] px-4 py-3 rounded-md text-sm">
                {errors.root.message}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#374151] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
                placeholder="pastor@church.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#374151] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="w-full px-3 py-2 pr-10 border border-[#E2E8F0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-[#22C55E] transition-colors"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6B7280] hover:text-[#374151] transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-[#EF4444]">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-4 w-4 text-[#22C55E] focus:ring-[#22C55E] border-[#E2E8F0] rounded"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6B7280]">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#22C55E] text-white py-2 px-4 rounded-md hover:bg-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
            <p className="text-xs text-[#6B7280] text-center">
              Secure access for authorized church staff only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}