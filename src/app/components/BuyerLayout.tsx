import { ReactNode, useState } from 'react';
import { Search, Store, User, LogOut } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface BuyerLayoutProps {
  children: ReactNode;
  language: 'en' | 'ur';
  onLanguageChange: (lang: 'en' | 'ur') => void;
  onNavigate?: (page: string) => void;
  onLogout: () => void;
  isLoggedIn?: boolean;
}

export function BuyerLayout({ children, language, onLanguageChange, onNavigate, onLogout, isLoggedIn = false }: BuyerLayoutProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const t = {
    searchPlaceholder: language === 'en' ? 'Search for phones...' : 'فون تلاش کریں...',
    login: language === 'en' ? 'Login' : 'لاگ ان',
    signup: language === 'en' ? 'Sign Up' : 'سائن اپ',
    signOut: language === 'en' ? 'Sign Out' : 'سائن آؤٹ',
    buyer: language === 'en' ? 'Buyer' : 'خریدار',
    about: language === 'en' ? 'About' : 'کے بارے میں',
    contact: language === 'en' ? 'Contact' : 'رابطہ',
    terms: language === 'en' ? 'Terms' : 'شرائط',
    privacy: language === 'en' ? 'Privacy' : 'رازداری',
    sitemap: language === 'en' ? 'Sitemap' : 'سائٹ میپ',
    copyright: language === 'en' ? '© 2026 Mobile Hub. All rights reserved.' : '© 2026 موبائل ہب۔ تمام حقوق محفوظ ہیں۔',
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <button 
              onClick={() => onNavigate?.('homepage')}
              className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <Store className="w-6 h-6 text-[#1A73E8]" />
              <span className="text-lg font-semibold text-gray-900">
                Mobile Hub
              </span>
            </button>

            {/* Search - Prominent */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 h-11 bg-gray-50 border-gray-200 rounded-full focus:bg-white"
                />
              </div>
            </div>

            {/* Auth Actions / Profile */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
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
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {t.buyer}
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
                          {t.signOut}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    {t.login}
                  </Button>
                  <Button size="sm">
                    {t.signup}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {t.about}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'en' 
                  ? 'Pakistan\'s leading mobile marketplace connecting buyers with trusted retailers.'
                  : 'پاکستان کی سرکردہ موبائل مارکیٹ جو خریداروں کو قابل اعتماد خوردہ فروشوں سے جوڑتی ہے۔'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {language === 'en' ? 'Quick Links' : 'فوری لنکس'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    {language === 'en' ? 'Browse Products' : 'مصنوعات براؤز کریں'}
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    {language === 'en' ? 'Find Shops' : 'دکانیں تلاش کریں'}
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    {language === 'en' ? 'Become a Seller' : 'بیچنے والے بنیں'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {language === 'en' ? 'Legal' : 'قانونی'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    {t.terms}
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    {t.privacy}
                  </button>
                </li>
                <li>
                  <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    {t.sitemap}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {t.contact}
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">
                  {language === 'en' ? 'Email: support@mobilehub.app' : 'ای میل: support@mobilehub.app'}
                </li>
                <li className="text-sm text-gray-600">
                  {language === 'en' ? 'Phone: +92 300 1234567' : 'فون: +92 300 1234567'}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              {t.copyright}
            </p>

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
          </div>
        </div>
      </footer>
    </div>
  );
}