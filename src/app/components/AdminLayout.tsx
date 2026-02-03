import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  DollarSign, 
  Megaphone, 
  FileText,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  language: 'en' | 'ur';
  onLanguageChange: (lang: 'en' | 'ur') => void;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: { en: 'Dashboard', ur: 'ڈیش بورڈ' }, icon: LayoutDashboard },
  { id: 'users', label: { en: 'Users', ur: 'صارفین' }, icon: Users },
  { id: 'shops', label: { en: 'Shops', ur: 'دکانیں' }, icon: Store },
  { id: 'revenue', label: { en: 'Revenue', ur: 'آمدنی' }, icon: DollarSign },
  { id: 'ads', label: { en: 'Ads', ur: 'اشتہارات' }, icon: Megaphone },
  { id: 'logs', label: { en: 'Logs', ur: 'لاگز' }, icon: FileText },
];

const pageTitles: Record<string, { en: string; ur: string }> = {
  dashboard: { en: 'Dashboard', ur: 'ڈیش بورڈ' },
  users: { en: 'User Management', ur: 'صارف کا انتظام' },
  shops: { en: 'Shops', ur: 'دکانیں' },
  revenue: { en: 'Revenue', ur: 'آمدنی' },
  ads: { en: 'Ads Control', ur: 'اشتہارات کا کنٹرول' },
  logs: { en: 'System Logs', ur: 'سسٹم لاگز' },
};

export function AdminLayout({ children, currentPage, language, onLanguageChange, onPageChange, onLogout }: AdminLayoutProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#fafafa]" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
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
        <nav className="flex-1 px-3 py-4 space-y-1">
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
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">
            {pageTitles[currentPage][language]}
          </h1>

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

            {/* Admin Profile Dropdown */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Admin' : 'ایڈمن'}
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
      </div>
    </div>
  );
}