import { Users, Store, CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface DashboardProps {
  language: 'en' | 'ur';
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend: number;
  data: { value: number }[];
  color: string;
  language: 'en' | 'ur';
  delay: number;
}

const AnimatedCounter = ({ value }: { value: string }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {value}
        </motion.span>
    )
}

function MetricCard({ title, value, subtitle, icon: Icon, trend, data, color, language, delay }: MetricCardProps) {
  // Map color names to actual Tailwind classes
  const colorMap: Record<string, { bg: string; text: string; iconBg: string }> = {
    'from-blue-500 to-blue-600': { 
      bg: 'bg-blue-500', 
      text: 'text-blue-500',
      iconBg: 'bg-blue-50'
    },
    'from-purple-500 to-purple-600': { 
      bg: 'bg-purple-500', 
      text: 'text-purple-500',
      iconBg: 'bg-purple-50'
    },
    'from-orange-500 to-orange-600': { 
      bg: 'bg-orange-500', 
      text: 'text-orange-500',
      iconBg: 'bg-orange-50'
    },
    'from-emerald-500 to-emerald-600': { 
      bg: 'bg-emerald-500', 
      text: 'text-emerald-500',
      iconBg: 'bg-emerald-50'
    },
  };

  const colors = colorMap[color] || { bg: 'bg-blue-500', text: 'text-blue-500', iconBg: 'bg-blue-50' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group h-full bg-white">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />
        
        <CardContent className="p-6 relative bg-[rgba(0,0,0,0)]">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${colors.iconBg}`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'} bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm`}>
              {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(trend)}%
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-[#8A8A8A]">{title}</p>
            <h3 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">
                <AnimatedCounter value={value} />
            </h3>
             {subtitle && (
              <p className="text-xs text-[#8A8A8A] mt-1">{subtitle}</p>
            )}
          </div>

          <div className="h-16 mt-4 -mx-2 opacity-70">
            <div style={{ width: '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={trend >= 0 ? '#10b981' : '#ef4444'} 
                    strokeWidth={2} 
                    dot={false}
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Dashboard({ language }: DashboardProps) {
  // Mock data for sparklines
  const generateData = () => Array.from({ length: 10 }, () => ({ value: Math.floor(Math.random() * 100) }));
  
  const metrics = [
    {
      title: language === 'en' ? 'Total Users' : 'کل صارفین',
      value: '12,458',
      subtitle: language === 'en' ? 'Active accounts' : 'فعال اکاؤنٹس',
      icon: Users,
      trend: 12.5,
      data: generateData(),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: language === 'en' ? 'Active Shopkeepers' : 'فعال دکاندار',
      value: '3,847',
      subtitle: language === 'en' ? 'Verified sellers' : 'تصدیق شدہ فروخت کنندگان',
      icon: Store,
      trend: 8.2,
      data: generateData(),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: language === 'en' ? 'Active Subscriptions' : 'فعال سبسکرپشنز',
      value: '2,943',
      subtitle: language === 'en' ? 'Paid & Trial Plans' : 'ادائیگی اور آزمائشی منصوبے',
      icon: CreditCard,
      trend: -2.4,
      data: generateData(),
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: language === 'en' ? 'Monthly Revenue' : 'ماہانہ آمدنی',
      value: '$47,231',
      subtitle: language === 'en' ? 'Gross income' : 'مجموعی آمدنی',
      icon: DollarSign,
      trend: 15.3,
      data: generateData(),
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A]">
           {language === 'en' ? 'Dashboard Overview' : 'ڈیش بورڈ کا جائزہ'}
        </h1>
        <p className="text-[#8A8A8A]">
           {language === 'en' ? 'Welcome back, here is what is happening today.' : 'خوش آمدید، آج کیا ہو رہا ہے۔'}
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            {...metric}
            language={language}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Secondary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Active Users Analytics */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
        >
            <Card className="border border-gray-200 shadow-sm h-full bg-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
                    <Activity className="w-5 h-5 text-[#1A73E8]" />
                    {language === 'en' ? 'User Activity' : 'صارف کی سرگرمی'}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                            <p className="text-sm text-[#8A8A8A] mb-1">{language === 'en' ? '24h Active' : '24 گھنٹے فعال'}</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">4,832</p>
                        </div>
                        <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                            <p className="text-sm text-[#8A8A8A] mb-1">{language === 'en' ? '7d Active' : '7 دن فعال'}</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">9,124</p>
                        </div>
                        <div className="p-4 bg-[#FAFAFA] rounded-xl border border-gray-200">
                            <p className="text-sm text-[#8A8A8A] mb-1">{language === 'en' ? '30d Active' : '30 دن فعال'}</p>
                            <p className="text-2xl font-bold text-[#1A1A1A]">11,843</p>
                        </div>
                    </div>
                    
                    <div className="h-[200px] w-full bg-gradient-to-b from-blue-50/50 to-transparent rounded-xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={Array.from({length: 20}, (_, i) => ({ val: Math.sin(i/2) * 20 + 50 + Math.random() * 10 }))}>
                                <Line type="monotone" dataKey="val" stroke="#1A73E8" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
            </Card>
        </motion.div>

        {/* Revenue Summary */}
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.5 }}
        >
            <Card className="border border-gray-200 shadow-sm h-full bg-white">
            <CardContent className="p-8 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-8 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#1A73E8]" />
                        {language === 'en' ? 'Revenue Summary' : 'آمدنی کا خلاصہ'}
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <span className="text-[#8A8A8A]">
                            {language === 'en' ? 'Today' : 'آج'}
                            </span>
                            <span className="text-xl font-bold text-[#1A1A1A]">$2,847</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <span className="text-[#8A8A8A]">
                            {language === 'en' ? 'This Week' : 'اس ہفتے'}
                            </span>
                            <span className="text-xl font-bold text-[#1A1A1A]">$18,394</span>
                        </div>
                        <div className="flex items-center justify-between pb-2">
                            <span className="text-[#8A8A8A]">
                            {language === 'en' ? 'This Month' : 'اس مہینے'}
                            </span>
                            <span className="text-xl font-bold text-emerald-600">$47,231</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-[#8A8A8A] mb-2">Projected Growth</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[75%]" />
                    </div>
                    <p className="text-right text-xs text-emerald-600 mt-1">+12% vs last month</p>
                </div>
            </CardContent>
            </Card>
        </motion.div>
      </div>
    </div>
  );
}