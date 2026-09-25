import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import authService from '../services/authService';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setApiError(null);
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setSubmitted(true);
    } catch {
      // Always show success for security — never reveal if email exists
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-baza-navy">Reset Password</h2>
        <p className="text-xs text-baza-text-secondary mt-1">Enter your registered email to receive password reset instructions.</p>
      </div>

      {submitted ? (
        <div className="p-4 bg-baza-green-light/30 border border-baza-green/30 rounded-baza text-center space-y-2">
          <p className="text-xs font-bold text-baza-green-dark">Reset Link Sent!</p>
          <p className="text-[11px] text-baza-text-secondary">
            If an account exists for <span className="font-semibold">{email}</span>, you will receive password reset steps shortly.
          </p>
        </div>
      ) : (
        <>
          {apiError && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-baza text-xs text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{apiError}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Button type="submit" variant="primary" fullWidth isLoading={isLoading} leftIcon={<Send className="w-4 h-4" />}>
              Send Reset Instructions
            </Button>
          </form>
        </>
      )}

      <div className="pt-4 border-t border-baza-border text-center">
        <Link to="/login" className="text-xs font-bold text-baza-navy hover:text-baza-green transition-colors inline-flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};
