import { useState, useEffect } from 'react';
import { AdminLayout } from '@/app/components/AdminLayout';
import { Dashboard } from '@/app/components/Dashboard';
import { UserManagement } from '@/app/components/UserManagement';
import { Shops } from '@/app/components/Shops';
import { Revenue } from '@/app/components/Revenue';
import { AdsControl } from '@/app/components/AdsControl';
import { SystemLogs } from '@/app/components/SystemLogs';
import { ShopkeeperLayout } from '@/app/components/ShopkeeperLayout';
import { ShopkeeperDashboard } from '@/app/components/ShopkeeperDashboard';
import { Inventory } from '@/app/components/Inventory';
import { Ledger } from '@/app/components/Ledger';
import { Expenses } from '@/app/components/Expenses';
import { Credit } from '@/app/components/Credit';
import { Storefront } from '@/app/components/Storefront';
import { Subscription } from '@/app/components/Subscription';
import { Profile } from '@/app/components/Profile';
import { BuyerLayout } from '@/app/components/BuyerLayout';
import { BuyerHomepage } from '@/app/components/BuyerHomepage';
import { ProductDiscovery } from '@/app/components/ProductDiscovery';
import { ShopPage } from '@/app/components/ShopPage';
import { ProductDetails } from '@/app/components/ProductDetails';
import { DemoLogin } from '@/app/components/DemoLogin';

type AdminPage = 'dashboard' | 'users' | 'shops' | 'revenue' | 'ads' | 'logs';
type ShopkeeperPage = 'dashboard' | 'inventory' | 'ledger' | 'expenses' | 'credit' | 'storefront' | 'subscription' | 'profile';
type BuyerPage = 'home' | 'products' | 'shop' | 'productDetails';
type UserRole = 'admin' | 'shopkeeper' | 'buyer' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [adminPage, setAdminPage] = useState<AdminPage>('dashboard');
  const [shopkeeperPage, setShopkeeperPage] = useState<ShopkeeperPage>('dashboard');
  const [buyerPage, setBuyerPage] = useState<BuyerPage>('home');
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  // Scroll to top when buyer page changes
  useEffect(() => {
    if (userRole === 'buyer') {
      window.scrollTo(0, 0);
    }
  }, [buyerPage, userRole]);

  // Demo login handler
  const handleLogin = (role: 'buyer' | 'shopkeeper' | 'admin') => {
    setUserRole(role);
  };

  // Logout handler
  const handleLogout = () => {
    setUserRole(null);
    // Reset page states when logging out
    setAdminPage('dashboard');
    setShopkeeperPage('dashboard');
    setBuyerPage('home');
  };

  const renderContent = () => {
    // If not logged in, show demo login screen
    if (!userRole) {
      return (
        <DemoLogin 
          language={language} 
          onLogin={handleLogin}
          onLanguageChange={setLanguage}
        />
      );
    }

    // Admin Panel
    if (userRole === 'admin') {
      const renderAdminPage = () => {
        switch (adminPage) {
          case 'dashboard':
            return <Dashboard language={language} />;
          case 'users':
            return <UserManagement language={language} />;
          case 'shops':
            return <Shops language={language} />;
          case 'revenue':
            return <Revenue language={language} />;
          case 'ads':
            return <AdsControl language={language} />;
          case 'logs':
            return <SystemLogs language={language} />;
          default:
            return <Dashboard language={language} />;
        }
      };

      return (
        <AdminLayout
          currentPage={adminPage}
          language={language}
          onLanguageChange={setLanguage}
          onPageChange={(page) => setAdminPage(page as AdminPage)}
          onLogout={handleLogout}
        >
          {renderAdminPage()}
        </AdminLayout>
      );
    }

    // Shopkeeper Panel
    if (userRole === 'shopkeeper') {
      const renderShopkeeperPage = () => {
        switch (shopkeeperPage) {
          case 'dashboard':
            return <ShopkeeperDashboard language={language} />;
          case 'inventory':
            return <Inventory language={language} />;
          case 'ledger':
            return <Ledger language={language} />;
          case 'expenses':
            return <Expenses language={language} />;
          case 'credit':
            return <Credit language={language} />;
          case 'storefront':
            return <Storefront language={language} />;
          case 'subscription':
            return <Subscription language={language} />;
          case 'profile':
            return <Profile language={language} />;
          default:
            return <ShopkeeperDashboard language={language} />;
        }
      };

      return (
        <ShopkeeperLayout
          currentPage={shopkeeperPage}
          language={language}
          onLanguageChange={setLanguage}
          onPageChange={(page) => setShopkeeperPage(page as ShopkeeperPage)}
          showSearch={shopkeeperPage === 'inventory'}
          onLogout={handleLogout}
        >
          {renderShopkeeperPage()}
        </ShopkeeperLayout>
      );
    }

    // Buyer Panel
    const renderBuyerPage = () => {
      switch (buyerPage) {
        case 'home':
          return (
            <BuyerHomepage 
              language={language}
              onNavigateToProduct={() => setBuyerPage('productDetails')}
            />
          );
        case 'products':
          return (
            <ProductDiscovery 
              language={language}
              onNavigateToProduct={() => setBuyerPage('productDetails')}
            />
          );
        case 'shop':
          return (
            <ShopPage 
              language={language}
              onNavigateToProduct={() => setBuyerPage('productDetails')}
            />
          );
        case 'productDetails':
          return (
            <ProductDetails 
              language={language}
              onNavigate={(page) => setBuyerPage(page as BuyerPage)}
              onNavigateToShop={() => setBuyerPage('shop')}
            />
          );
        default:
          return (
            <BuyerHomepage 
              language={language}
              onNavigateToProduct={() => setBuyerPage('productDetails')}
            />
          );
      }
    };

    return (
      <BuyerLayout
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={(page) => setBuyerPage(page as BuyerPage)}
        onLogout={handleLogout}
        isLoggedIn={true}
      >
        {renderBuyerPage()}
      </BuyerLayout>
    );
  };

  return (
    <>
      {renderContent()}
    </>
  );
}