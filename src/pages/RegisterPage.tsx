import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus, AlertCircle } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import authService from '../services/authService';
import { useSessionStore, SessionUser } from '../store';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSession } = useSessionStore();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setApiError(null);
    try {
      const response = await authService.register(data);
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
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setApiError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-baza-navy">Create BAZA Account</h2>
        <p className="text-xs text-baza-text-secondary mt-1">Join Rwanda's trusted marketplace community.</p>
      </div>

      {apiError && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-baza text-xs text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            placeholder="Emmanuel"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last Name"
            placeholder="Mugisha"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+250 788 000 000"
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting} leftIcon={<UserPlus className="w-4 h-4" />}>
          Register Account
        </Button>
      </form>

      <div className="pt-4 border-t border-baza-border text-center text-xs text-baza-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-baza-green hover:underline">
          Sign in here
        </Link>
      </div>
    </div>
  );
};
