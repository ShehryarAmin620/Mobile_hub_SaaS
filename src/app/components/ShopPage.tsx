import { useState } from 'react';
import { Store, MapPin, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Slider } from '@/app/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { ProductCard } from '@/app/components/ProductCard';
import { AdBanner } from '@/app/components/AdBanner';

interface ShopPageProps {
  language: 'en' | 'ur';
  onNavigateToProduct?: (productId: string) => void;
}

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  shopName: string;
  brand: string;
}

const mockShopData = {
  name: 'Mobile Hub',
  logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
  city: 'Karachi',
  address: 'Shop #42, Saddar Market',
  description: 'Welcome to Mobile Hub! We offer the latest smartphones from top brands including Apple, Samsung, Xiaomi, and more. Quality products at competitive prices with warranty.',
  phone: '+92 300 1234567',
};

const mockProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1592286927505-2fd6c3d2d2c8?w=400&h=400&fit=crop',
    name: 'iPhone 15 Pro 256GB Black',
    price: 315000,
    shopName: 'Mobile Hub',
    brand: 'Apple',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: 275000,
    shopName: 'Mobile Hub',
    brand: 'Samsung',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    name: 'Xiaomi 14 Pro 256GB White',
    price: 152000,
    shopName: 'Mobile Hub',
    brand: 'Xiaomi',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    name: 'Google Pixel 8 Pro 128GB',
    price: 208000,
    shopName: 'Mobile Hub',
    brand: 'Google',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
    name: 'Oppo Find X7 Pro 512GB',
    price: 175000,
    shopName: 'Mobile Hub',
    brand: 'Oppo',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop',
    name: 'Vivo X100 Pro 256GB Blue',
    price: 168000,
    shopName: 'Mobile Hub',
    brand: 'Vivo',
  },
];

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Oppo', 'Vivo'];

export function ShopPage({ language, onNavigateToProduct }: ShopPageProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);

  const t = {
    products: language === 'en' ? 'Products' : 'مصنوعات',
    showing: language === 'en' ? 'Showing' : 'دکھا رہے ہیں',
    of: language === 'en' ? 'of' : 'میں سے',
    contact: language === 'en' ? 'Contact Shop' : 'دکان سے رابطہ کریں',
    filters: {
      title: language === 'en' ? 'Filters' : 'فلٹرز',
      brand: language === 'en' ? 'Brand' : 'برانڈ',
      price: language === 'en' ? 'Price Range' : 'قیمت کی حد',
      all: language === 'en' ? 'All' : 'تمام',
    },
  };

  const filteredProducts = mockProducts.filter((product) => {
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const handleContactShop = () => {
    const phoneNumber = mockShopData.phone.replace(/\s/g, '');
    const text = encodeURIComponent(`Hi, I found your shop on Mobile Marketplace. I'd like to know more about your products.`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const FiltersContent = () => (
    <div className="space-y-4">
      {/* Brand Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">{t.filters.brand}</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.all}</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900">{t.filters.price}</Label>
        <Slider
          min={0}
          max={500000}
          step={10000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-2"
        />
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>₨{priceRange[0].toLocaleString()}</span>
          <span>₨{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Shop Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Shop Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={mockShopData.logo}
                  alt={mockShopData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Shop Info */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {mockShopData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{mockShopData.city}</span>
                </div>
                <span>•</span>
                <span>{mockShopData.address}</span>
              </div>
              <p className="text-gray-600 max-w-3xl">
                {mockShopData.description}
              </p>
            </div>

            {/* Contact Button */}
            <div className="flex-shrink-0">
              <Button size="lg" onClick={handleContactShop}>
                <MessageCircle className="w-5 h-5 mr-2" />
                {t.contact}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {t.products}
            </h2>
            <p className="text-sm text-gray-600">
              {t.showing} {filteredProducts.length} {t.of} {mockProducts.length} {t.products}
            </p>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {t.filters.title}
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ur' ? 'right' : 'left'} className="w-80">
                <SheetHeader>
                  <SheetTitle>{t.filters.title}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t.filters.title}
              </h3>
              <FiltersContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="space-y-8">
              {Array.from({ length: Math.ceil(filteredProducts.length / 4) }).map((_, groupIndex) => {
                const startIdx = groupIndex * 4;
                const groupProducts = filteredProducts.slice(startIdx, startIdx + 4);

                return (
                  <div key={groupIndex} className="space-y-8">
                    {/* Products */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {groupProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          shopName={product.shopName}
                          language={language}
                          onCardClick={() => onNavigateToProduct?.(product.id)}
                        />
                      ))}
                    </div>

                    {/* Ad Banner between sections */}
                    {groupIndex < Math.ceil(filteredProducts.length / 4) - 1 && (
                      <AdBanner language={language} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}