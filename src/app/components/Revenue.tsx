import { DollarSign, TrendingUp, CreditCard, Info } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';

interface RevenueProps {
  language: 'en' | 'ur';
}

export function Revenue({ language }: RevenueProps) {
  const text = {
    en: {
      revenueSummary: 'Revenue Summary',
      totalRevenue: 'Total Revenue',
      monthlyRecurring: 'Monthly Recurring Revenue',
      averageRevenue: 'Average Revenue Per User',
      subscriptionMetrics: 'Subscription Metrics',
      activeSubscriptions: 'Active Subscriptions',
      newThisMonth: 'New This Month',
      churnRate: 'Churn Rate',
      dataSource: 'Data Source',
      dataSourceNote: 'Revenue data is collected from Paddle / Lemon Squeezy webhooks',
      breakdown: 'Subscription Breakdown',
      free: 'Free',
      basic: 'Basic',
      premium: 'Premium',
      enterprise: 'Enterprise',
      users: 'users',
    },
    ur: {
      revenueSummary: 'آمدنی کا خلاصہ',
      totalRevenue: 'کل آمدنی',
      monthlyRecurring: 'ماہانہ بار بار آمدنی',
      averageRevenue: 'فی صارف اوسط آمدنی',
      subscriptionMetrics: 'سبسکرپشن میٹرکس',
      activeSubscriptions: 'فعال سبسکرپشنز',
      newThisMonth: 'اس مہینے نئے',
      churnRate: 'چرن ریٹ',
      dataSource: 'ڈیٹا کا ذریعہ',
      dataSourceNote: 'آمدنی کا ڈیٹا Paddle / Lemon Squeezy ویب ہکس سے جمع کیا جاتا ہے',
      breakdown: 'سبسکرپشن کی تفصیل',
      free: 'مفت',
      basic: 'بنیادی',
      premium: 'پریمیم',
      enterprise: 'انٹرپرائز',
      users: 'صارفین',
    },
  };

  const t = text[language];

  return (
    <div className="p-8 space-y-8">
      {/* Revenue Summary Cards */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">{t.revenueSummary}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#8A8A8A]">{t.totalRevenue}</p>
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">$847,231</p>
                <div className="flex items-center gap-1.5 text-green-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+12.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#8A8A8A]">{t.monthlyRecurring}</p>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#1A73E8]" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">$47,231</p>
                <div className="flex items-center gap-1.5 text-green-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+8.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#8A8A8A]">{t.averageRevenue}</p>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">$16.05</p>
                <div className="flex items-center gap-1.5 text-green-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">+5.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscription Metrics */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">{t.subscriptionMetrics}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#8A8A8A]">{t.activeSubscriptions}</p>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">2,943</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#8A8A8A]">{t.newThisMonth}</p>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#1A73E8]" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">247</p>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <p className="text-sm font-medium text-[#8A8A8A]">{t.churnRate}</p>
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">2.4%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Subscription Breakdown */}
      <div>
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">{t.breakdown}</h2>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                  <span className="text-base font-medium text-[#4A4A4A]">{t.free}</span>
                </div>
                <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">8,612 {t.users}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-base font-medium text-[#4A4A4A]">{t.basic}</span>
                </div>
                <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">1,284 {t.users}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#1A73E8]"></div>
                  <span className="text-base font-medium text-[#4A4A4A]">{t.premium}</span>
                </div>
                <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">1,247 {t.users}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-base font-medium text-[#4A4A4A]">{t.enterprise}</span>
                </div>
                <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">412 {t.users}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Source Note */}
      <Card className="border-blue-200 bg-blue-50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#1A73E8] mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-900">{t.dataSource}</p>
              <p className="text-sm text-blue-700">{t.dataSourceNote}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}