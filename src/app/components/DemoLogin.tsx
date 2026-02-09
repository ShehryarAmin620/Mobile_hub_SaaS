import { Store } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { useState } from 'react';

interface DemoLoginProps {
  language: 'en' | 'ur';
  onLogin: (role: 'buyer' | 'shopkeeper' | 'admin') => void;
  onLanguageChange: (lang: 'en' | 'ur') => void;
}

export function DemoLogin({ language, onLogin, onLanguageChange }: DemoLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const t = {
    title: language === 'en' ? 'Welcome Back' : 'خوش آمدید',
    subtitle: language === 'en' ? 'Sign in to your account' : 'اپنے اکاؤنٹ میں سائن ان کریں',
    email: language === 'en' ? 'Email' : 'ای میل',
    password: language === 'en' ? 'Password' : 'پاسورڈ',
    forgotPassword: language === 'en' ? 'Forgot password?' : 'پاسورڈ بھول گئے؟',
    signIn: language === 'en' ? 'Sign In' : 'سائن ان کریں',
    signInGoogle: language === 'en' ? 'Sign in with Google' : 'گوگل سے سائن ان کریں',
    noAccount: language === 'en' ? "Don't have an account?" : 'اکاؤنٹ نہیں ہے؟',
    signUp: language === 'en' ? 'Sign up' : 'سائن اپ کریں',
    or: language === 'en' ? 'Or continue with' : 'یا جاری رکھیں',
  };

  // Handle demo login with specific email/password combinations
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials logic (not displayed in UI)
    if (email === 'admin@gmail.com' && password === 'admin') {
      onLogin('admin');
    } else if (email === 'shopkeeper@gmail.com' && password === 'shopkeeper') {
      onLogin('shopkeeper');
    } else if (email === 'buyer@gmail.com' && password === 'buyer') {
      onLogin('buyer');
    }
    // In a real app, show error message for invalid credentials
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      {/* Language Toggle - Top Right */}
      <div className="fixed top-4 right-4">
        <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
              language === 'en'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('ur')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
              language === 'ur'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            UR
          </button>
        </div>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <Store className="w-7 h-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t.title}
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            {t.subtitle}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700">{t.password}</Label>
                <button 
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  {t.forgotPassword}
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t.signIn}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                {t.or}
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" type="button">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.signInGoogle}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            {t.noAccount}{' '}
            <button type="button" className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200">
              {t.signUp}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}