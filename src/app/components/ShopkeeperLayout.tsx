import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  Receipt, 
  ArrowLeftRight, 
  Store,
  CreditCard,
  User,
  LogOut,
  Search,
  Crown
} from 'lucide-react';
import {
  Button
} from '@/app/components/ui/button';
import {
  Input
} from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';

interface ShopkeeperLayoutProps {
  children: ReactNode;
  currentPage: string;
  language: 'en' | 'ur';
  onLanguageChange: (lang: 'en' | 'ur') => void;
  onPageChange: (page: string) => void;
  showSearch?: boolean;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: { en: 'Dashboard', ur: 'ڈیش بورڈ' }, icon: LayoutDashboard },
  { id: 'inventory', label: { en: 'Inventory', ur: 'انوینٹری' }, icon: Package },
  { id: 'ledger', label: { en: 'Ledger', ur: 'کھاتہ' }, icon: BookOpen },
  { id: 'expenses', label: { en: 'Expenses', ur: 'اخراجات' }, icon: Receipt },
  { id: 'credit', label: { en: 'Credit', ur: 'قرض' }, icon: ArrowLeftRight },
  { id: 'storefront', label: { en: 'Storefront', ur: 'سٹور فرنٹ' }, icon: Store },
  { id: 'subscription', label: { en: 'Subscription', ur: 'سبسکرپشن' }, icon: CreditCard },
  { id: 'profile', label: { en: 'Profile', ur: 'پروفائل' }, icon: User },
];

const pageTitles: Record<string, { en: string; ur: string }> = {
  dashboard: { en: 'Dashboard', ur: 'ڈیش بورڈ' },
  inventory: { en: 'Inventory Management', ur: 'انوینٹری کا انتظام' },
  ledger: { en: 'Ledger', ur: 'کھاتہ' },
  expenses: { en: 'Expense Tracker', ur: 'اخراجات ٹریکر' },
  credit: { en: 'Credit (Lend / Borrow)', ur: 'قرض (دینا / لینا)' },
  storefront: { en: 'Storefront Management', ur: 'سٹور فرنٹ کا انتظام' },
  subscription: { en: 'Subscription', ur: 'سبسکرپشن' },
  profile: { en: 'Profile', ur: 'پروفائل' },
};

export function ShopkeeperLayout({ 
  children, 
  currentPage, 
  language, 
  onLanguageChange, 
  onPageChange,
  showSearch = false,
  onLogout 
}: ShopkeeperLayoutProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const currentPlan = 'Free'; // Mock - would come from context/state

  return (
    <div className="flex h-screen bg-[#fafafa]" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <button 
            onClick={() => onPageChange('dashboard')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Store className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              Mobile Hub
            </span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label[language]}</span>
              </button>
            );
          })}
        </nav>

        {/* Plan Badge */}
        <div className="px-3 pb-4 border-t border-gray-200 pt-4">
          <button
            onClick={() => onPageChange('subscription')}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-gray-900">{currentPlan} Plan</div>
                <div className="text-xs text-gray-500">
                  {language === 'en' ? 'Upgrade' : 'اپ گریڈ'}
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {language === 'en' ? 'Free' : 'مفت'}
            </Badge>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-semibold text-gray-900">
              {pageTitles[currentPage][language]}
            </h1>

            {/* Optional Search */}
            {showSearch && (
              <div className="hidden lg:block flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder={language === 'en' ? 'Search inventory...' : 'انوینٹری تلاش کریں...'}
                    className="pl-9 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
                  language === 'en'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('ur')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ease-in-out ${
                  language === 'ur'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                UR
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <Store className="w-4 h-4 text-gray-600" />
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {language === 'en' ? 'My Shop' : 'میری دکان'}
                </span>
              </Button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50 py-1">
                    <div className="px-4 py-2 text-sm text-gray-500 font-medium cursor-default opacity-50">
                      {language === 'en' ? 'Profile' : 'پروفائل'}
                    </div>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'en' ? 'Sign Out' : 'سائن آؤٹ'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-[#fafafa]">
          {children}
        </main>

        {/* Bottom Navigation - Mobile */}
        <nav className="md:hidden bg-white border-t border-gray-200 flex items-center justify-around py-2 shadow-sm">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label[language]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}