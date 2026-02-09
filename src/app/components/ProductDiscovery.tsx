import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
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

interface ProductDiscoveryProps {
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
  city: string;
  storage: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1592286927505-2fd6c3d2d2c8?w=400&h=400&fit=crop',
    name: 'iPhone 15 Pro 256GB Black',
    price: 315000,
    shopName: 'Mobile Hub Karachi',
    brand: 'Apple',
    city: 'Karachi',
    storage: '256GB',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: 275000,
    shopName: 'Tech Store Lahore',
    brand: 'Samsung',
    city: 'Lahore',
    storage: '512GB',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    name: 'Xiaomi 14 Pro 256GB White',
    price: 152000,
    shopName: 'Mobile World Islamabad',
    brand: 'Xiaomi',
    city: 'Islamabad',
    storage: '256GB',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    name: 'Google Pixel 8 Pro 128GB',
    price: 208000,
    shopName: 'Phone Gallery Karachi',
    brand: 'Google',
    city: 'Karachi',
    storage: '128GB',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
    name: 'OnePlus 12 256GB Green',
    price: 125000,
    shopName: 'Digital Shop Rawalpindi',
    brand: 'OnePlus',
    city: 'Rawalpindi',
    storage: '256GB',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
    name: 'Oppo Find X7 Pro 512GB',
    price: 175000,
    shopName: 'Mobile Hub Karachi',
    brand: 'Oppo',
    city: 'Karachi',
    storage: '512GB',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop',
    name: 'Vivo X100 Pro 256GB Blue',
    price: 168000,
    shopName: 'Tech Store Lahore',
    brand: 'Vivo',
    city: 'Lahore',
    storage: '256GB',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    name: 'Realme GT 5 Pro 512GB',
    price: 145000,
    shopName: 'Phone Market Faisalabad',
    brand: 'Realme',
    city: 'Faisalabad',
    storage: '512GB',
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop',
    name: 'iPhone 14 Pro 128GB Purple',
    price: 265000,
    shopName: 'Apple Store Islamabad',
    brand: 'Apple',
    city: 'Islamabad',
    storage: '128GB',
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop',
    name: 'Samsung Galaxy Z Fold 5',
    price: 385000,
    shopName: 'Premium Phones Lahore',
    brand: 'Samsung',
    city: 'Lahore',
    storage: '512GB',
  },
];

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Oppo', 'Vivo', 'Realme'];
const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar'];
const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];

export function ProductDiscovery({ language, onNavigateToProduct }: ProductDiscoveryProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);

  const t = {
    title: language === 'en' ? 'Browse Products' : 'مصنوعات براؤز کریں',
    filters: {
      title: language === 'en' ? 'Filters' : 'فلٹرز',
      reset: language === 'en' ? 'Reset All' : 'تمام ری سیٹ کریں',
      brand: language === 'en' ? 'Brand' : 'برانڈ',
      model: language === 'en' ? 'Model' : 'ماڈل',
      storage: language === 'en' ? 'Storage' : 'اسٹوریج',
      city: language === 'en' ? 'City' : 'شہر',
      priceRange: language === 'en' ? 'Price Range' : 'قیمت کی حد',
      radius: language === 'en' ? 'Radius (km)' : 'رداس (کلومیٹر)',
      all: language === 'en' ? 'All' : 'تمام',
    },
    showing: language === 'en' ? 'Showing' : 'دکھا رہے ہیں',
    of: language === 'en' ? 'of' : 'میں سے',
    products: language === 'en' ? 'products' : 'مصنوعات',
  };

  const filteredProducts = mockProducts.filter((product) => {
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    if (selectedCity !== 'all' && product.city !== selectedCity) return false;
    if (selectedStorage !== 'all' && product.storage !== selectedStorage) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedCity('all');
    setSelectedStorage('all');
    setPriceRange([0, 500000]);
  };

  const FiltersContent = () => (
    <div className="space-y-6">
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

      {/* Storage Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">{t.filters.storage}</Label>
        <Select value={selectedStorage} onValueChange={setSelectedStorage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.all}</SelectItem>
            {storageOptions.map((storage) => (
              <SelectItem key={storage} value={storage}>
                {storage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Filter */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">{t.filters.city}</Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.filters.all}</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900">{t.filters.priceRange}</Label>
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

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={resetFilters}>
        <X className="w-4 h-4 mr-2" />
        {t.filters.reset}
      </Button>
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.title}
          </h1>
          <p className="text-sm text-gray-600">
            {t.showing} {filteredProducts.length} {t.of} {mockProducts.length} {t.products}
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Panel - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {t.filters.title}
                </h2>
                <FiltersContent />
              </div>
            </div>
          </aside>

          {/* Filters - Mobile */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
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

                    {/* Ad Banner after every 4 products */}
                    {groupIndex < Math.ceil(filteredProducts.length / 4) - 1 && (
                      <AdBanner language={language} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}