import { Package, DollarSign, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Button } from '@/app/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ShopkeeperDashboardProps {
  language: 'en' | 'ur';
}

// Mock data for charts
const plData = [
  { date: 'Mon', profit: 12000, loss: 3000 },
  { date: 'Tue', profit: 15000, loss: 4500 },
  { date: 'Wed', profit: 18000, loss: 5000 },
  { date: 'Thu', profit: 14000, loss: 3500 },
  { date: 'Fri', profit: 22000, loss: 6000 },
  { date: 'Sat', profit: 25000, loss: 7000 },
  { date: 'Sun', profit: 20000, loss: 5500 },
];

const salesExpensesData = [
  { month: 'Jan', sales: 85000, expenses: 45000 },
  { month: 'Feb', sales: 92000, expenses: 48000 },
  { month: 'Mar', sales: 105000, expenses: 52000 },
  { month: 'Apr', sales: 98000, expenses: 49000 },
  { month: 'May', sales: 115000, expenses: 55000 },
  { month: 'Jun', sales: 128000, expenses: 58000 },
];

const lowStockItems = [
  { name: 'iPhone 15 Pro', variant: '256GB Black', stock: 2 },
  { name: 'Samsung S24 Ultra', variant: '512GB Gray', stock: 1 },
  { name: 'Xiaomi 14', variant: '128GB White', stock: 3 },
];

const overdueCredit = [
  { customer: 'Ali Mobile Shop', amount: 45000, dueDate: '2026-01-15' },
  { customer: 'Karachi Electronics', amount: 28000, dueDate: '2026-01-20' },
];

export function ShopkeeperDashboard({ language }: ShopkeeperDashboardProps) {
  const t = {
    title: language === 'en' ? 'Dashboard' : 'ڈیش بورڈ',
    totalStock: language === 'en' ? 'Total Stock Units' : 'کل اسٹاک یونٹس',
    inventoryValue: language === 'en' ? 'Inventory Value' : 'انوینٹری کی قیمت',
    cashBalance: language === 'en' ? 'Cash Balance' : 'کیش بیلنس',
    creditOutstanding: language === 'en' ? 'Credit Outstanding' : 'باقی قرض',
    dailyPL: language === 'en' ? 'Daily Profit & Loss' : 'روزانہ منافع اور نقصان',
    salesVsExpenses: language === 'en' ? 'Sales vs Expenses' : 'فروخت بمقابلہ اخراجات',
    lowStock: language === 'en' ? 'Low Stock Alerts' : 'کم اسٹاک الرٹس',
    overdueCredit: language === 'en' ? 'Overdue Credit' : 'واجب الادا قرض',
    quickActions: language === 'en' ? 'Quick Actions' : 'فوری اقدامات',
    addProduct: language === 'en' ? 'Add Product' : 'پروڈکٹ شامل کریں',
    addExpense: language === 'en' ? 'Add Expense' : 'اخراجات شامل کریں',
    upgradePlan: language === 'en' ? 'Upgrade Plan' : 'پلان اپ گریڈ کریں',
    itemsLeft: language === 'en' ? 'items left' : 'اشیاء باقی',
    overdue: language === 'en' ? 'overdue' : 'واجب الادا',
    profit: language === 'en' ? 'Profit' : 'منافع',
    loss: language === 'en' ? 'Loss' : 'نقصان',
    sales: language === 'en' ? 'Sales' : 'فروخت',
    expenses: language === 'en' ? 'Expenses' : 'اخراجات',
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t.totalStock}
            </CardTitle>
            <Package className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">342</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t.inventoryValue}
            </CardTitle>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">₨2.4M</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t.cashBalance}
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">₨485K</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-green-600">+22%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t.creditOutstanding}
            </CardTitle>
            <AlertCircle className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-gray-900">₨73K</div>
            <p className="text-xs text-gray-500 mt-1">
              <span className="text-red-600">2 overdue</span> payments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily P&L Chart */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#1A1A1A]">
              {t.dailyPL}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <div style={{ width: '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={plData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    stroke="#d1d5db"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    stroke="#d1d5db"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
                    iconType="circle"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name={t.profit}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="loss" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name={t.loss}
                    dot={{ fill: '#ef4444', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales vs Expenses Chart */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#1A1A1A]">
              {t.salesVsExpenses}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px]">
            <div style={{ width: '100%', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesExpensesData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    stroke="#d1d5db"
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    stroke="#d1d5db"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
                    iconType="rect"
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="#1A73E8" 
                    name={t.sales}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill="#f59e0b" 
                    name={t.expenses}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              {t.lowStock}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems.map((item, index) => (
              <Alert key={index} className="border-orange-200 bg-orange-50">
                <AlertDescription className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.variant}</div>
                  </div>
                  <div className="text-sm font-medium text-orange-600">
                    {item.stock} {t.itemsLeft}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">
              {t.quickActions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              {t.addProduct}
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              {t.addExpense}
            </Button>
            <Button className="w-full justify-start" variant="default">
              <TrendingUp className="w-4 h-4 mr-2" />
              {t.upgradePlan}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Overdue Credit */}
      {overdueCredit.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              {t.overdueCredit}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueCredit.map((credit, index) => (
              <Alert key={index} className="border-red-200 bg-red-50">
                <AlertDescription className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{credit.customer}</div>
                    <div className="text-sm text-gray-600">Due: {credit.dueDate}</div>
                  </div>
                  <div className="text-sm font-medium text-red-600">
                    ₨{credit.amount.toLocaleString()}
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}