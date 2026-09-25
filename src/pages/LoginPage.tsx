import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import authService from '../services/authService';
import { useSessionStore, SessionUser } from '../store';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession } = useSessionStore();
  const [apiError, setApiError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setApiError(null);
    try {
      const response = await authService.login(data);
      const user: SessionUser = {
        id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        profileImageUrl: response.user.profileImageUrl,
        status: response.user.status,
        emailVerified: response.user.emailVerified,
        roles: response.user.roles,
      };
      setSession(user, response.accessToken, response.refreshToken);
      navigate(from, { replace: true });
    } catch (err: any) {
      setApiError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-baza-navy">Sign In to BAZA</h2>
        <p className="text-xs text-baza-text-secondary mt-1">Access your saved listings and active properties.</p>
      </div>

      {apiError && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-baza text-xs text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between text-xs">
          <Link to="/forgot-password" className="text-baza-green font-semibold hover:underline">
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} leftIcon={<LogIn className="w-4 h-4" />}>
          Sign In
        </Button>
      </form>

      <div className="pt-4 border-t border-baza-border text-center text-xs text-baza-text-secondary">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-baza-green hover:underline">
          Register here
        </Link>
      </div>
    </div>
  );
};
