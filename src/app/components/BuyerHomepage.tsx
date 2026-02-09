import { useState, useEffect } from 'react';
import { ProductCard } from '@/app/components/ProductCard';
import { AdBanner } from '@/app/components/AdBanner';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Slider } from '@/app/components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Skeleton } from '@/app/components/ui/skeleton';
import { SlidersHorizontal, X, ChevronRight, Star, TrendingUp, Sparkles, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactSlick from 'react-slick';

interface BuyerHomepageProps {
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
}

const mockProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1710023038502-ba80a70a9f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjAxNSUyMHByb3xlbnwxfHx8fDE3NzAwMTc3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    name: 'iPhone 15 Pro 256GB Black',
    price: 315000,
    shopName: 'Mobile Hub Karachi',
    brand: 'Apple',
    city: 'Karachi',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    price: 275000,
    shopName: 'Tech Store Lahore',
    brand: 'Samsung',
    city: 'Lahore',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    name: 'Xiaomi 14 Pro 256GB White',
    price: 152000,
    shopName: 'Mobile World Islamabad',
    brand: 'Xiaomi',
    city: 'Islamabad',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    name: 'Google Pixel 8 Pro 128GB',
    price: 208000,
    shopName: 'Phone Gallery Karachi',
    brand: 'Google',
    city: 'Karachi',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
    name: 'OnePlus 12 256GB Green',
    price: 125000,
    shopName: 'Digital Shop Rawalpindi',
    brand: 'OnePlus',
    city: 'Rawalpindi',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
    name: 'Oppo Find X7 Pro 512GB',
    price: 175000,
    shopName: 'Mobile Hub Karachi',
    brand: 'Oppo',
    city: 'Karachi',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop',
    name: 'Vivo X100 Pro 256GB Blue',
    price: 168000,
    shopName: 'Tech Store Lahore',
    brand: 'Vivo',
    city: 'Lahore',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    name: 'Realme GT 5 Pro 512GB',
    price: 145000,
    shopName: 'Phone Market Faisalabad',
    brand: 'Realme',
    city: 'Faisalabad',
  },
];

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Oppo', 'Vivo', 'Realme'];
const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar'];
const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export function BuyerHomepage({ language, onNavigateToProduct }: BuyerHomepageProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 500000]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const t = {
    hero: {
      title: language === 'en' 
        ? 'Find Your Perfect Phone' 
        : 'اپنا بہترین فون تلاش کریں',
      subtitle: language === 'en'
        ? 'Connect with trusted mobile retailers across Pakistan'
        : 'پاکستان بھر میں قابل اعتماد موبائل خوردہ فروشوں سے جڑیں',
      cta: language === 'en' ? 'Browse Products' : 'مصنوعات براؤز کریں',
      trending: language === 'en' ? 'Trending Now' : 'ابھی ٹرینڈنگ',
    },
    filters: {
      title: language === 'en' ? 'Filters' : 'فلٹرز',
      reset: language === 'en' ? 'Reset Filters' : 'فلٹرز ری سیٹ کریں',
      brand: language === 'en' ? 'Brand' : 'برانڈ',
      storage: language === 'en' ? 'Storage' : 'اسٹوریج',
      city: language === 'en' ? 'City' : 'شہر',
      priceRange: language === 'en' ? 'Price Range' : 'قیمت کی حد',
      all: language === 'en' ? 'All' : 'تمام',
    },
    products: {
      title: language === 'en' ? 'Featured Products' : 'نمایاں مصنوعات',
      showing: language === 'en' ? 'Showing' : 'دکھا رہے ہیں',
      results: language === 'en' ? 'results' : 'نتائج',
    },
  };

  const filteredProducts = mockProducts.filter((product) => {
    if (selectedBrand !== 'all' && product.brand !== selectedBrand) return false;
    if (selectedCity !== 'all' && product.city !== selectedCity) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedCity('all');
    setSelectedStorage('all');
    setPriceRange([0, 500000]);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#1A73E8]" />
          {t.filters.title}
        </h3>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-[#8A8A8A] hover:text-[#1A73E8]">
          <X className="w-4 h-4 mr-1" />
          {t.filters.reset}
        </Button>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[#4A4A4A]">{t.filters.brand}</Label>
        <div className="flex flex-wrap gap-2">
          <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => setSelectedBrand('all')}
             className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${
               selectedBrand === 'all' 
                 ? 'bg-[#1A73E8] text-white shadow-md' 
                 : 'bg-gray-100 text-[#4A4A4A] hover:bg-gray-200'
             }`}
          >
            {t.filters.all}
          </motion.button>
          {brands.map((brand) => (
            <motion.button
              key={brand}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedBrand(brand)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                selectedBrand === brand 
                  ? 'bg-[#1A73E8] text-white shadow-md' 
                  : 'bg-gray-100 text-[#4A4A4A] hover:bg-gray-200'
              }`}
            >
              {brand}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Storage Filter */}
      <div className="space-y-2">
        <Label className="text-[#4A4A4A]">{t.filters.storage}</Label>
        <Select value={selectedStorage} onValueChange={setSelectedStorage}>
          <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-[#1A73E8]">
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
        <Label className="text-[#4A4A4A]">{t.filters.city}</Label>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-full bg-white border-gray-200 focus:ring-[#1A73E8]">
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
        <Label className="text-[#4A4A4A]">{t.filters.priceRange}</Label>
        <Slider
          min={0}
          max={500000}
          step={10000}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mt-4"
        />
        <div className="flex items-center justify-between text-sm text-[#4A4A4A] bg-gray-50 p-2 rounded-lg border border-gray-100">
          <span>₨{priceRange[0].toLocaleString()}</span>
          <span>₨{priceRange[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Carousel */}
      <section className="relative py-16 overflow-hidden border-b border-gray-100">
        {/* Premium Mobile Shop Tech Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base gradient - more colorful */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/40 to-cyan-50/60" />
          
          {/* Subtle tech pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A73E8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Radial accent gradient - top right */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-[#1A73E8]/12 via-blue-100/8 to-transparent rounded-full blur-3xl" />
          
          {/* Radial accent gradient - bottom left */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-purple-100/15 via-blue-50/10 to-transparent rounded-full blur-3xl" />
          
          {/* Additional colorful accent - center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-50/15 via-blue-50/20 to-purple-50/15 rounded-full blur-3xl" />
          
          {/* Abstract circuit lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tech-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1A73E8" strokeWidth="0.5"/>
                <circle cx="0" cy="0" r="2" fill="#1A73E8"/>
                <circle cx="100" cy="0" r="2" fill="#1A73E8"/>
                <circle cx="0" cy="100" r="2" fill="#1A73E8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" />
          </svg>
          
          {/* Soft smartphone silhouette shapes */}
          <div className="absolute top-24 left-16 w-32 h-64 bg-gradient-to-b from-blue-200/8 to-cyan-100/5 rounded-3xl rotate-12 blur-2xl" />
          <div className="absolute bottom-24 right-24 w-40 h-72 bg-gradient-to-t from-purple-100/10 to-blue-100/8 rounded-3xl -rotate-6 blur-2xl" />
          <div className="absolute top-32 right-40 w-28 h-56 bg-gradient-to-bl from-cyan-100/8 to-blue-200/6 rounded-3xl rotate-6 blur-2xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left space-y-8">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, ease: 'easeOut' }}
                 className="space-y-8"
               >
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-[#1A73E8] border border-blue-100/50">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.hero.trending}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1A1A] tracking-[-0.02em] leading-[1.1]">
                  {t.hero.title}
                </h1>
                <p className="text-lg text-[#4A4A4A] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Button 
                    size="lg" 
                    className="text-base px-8 py-6 bg-[#1A73E8] hover:bg-[#1557b0] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02]"
                  >
                    {t.hero.cta}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Featured Carousel - Premium Centered */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.96 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
               className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-[560px]">
                {/* Subtle glow effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-blue-200/10 via-purple-100/12 to-cyan-200/10 rounded-[2.5rem] blur-2xl" />
                
                {/* Glassmorphism container */}
                <div className="relative">
                  {/* Glass panel behind carousel */}
                  <div className="absolute -inset-3 bg-white/60 backdrop-blur-md rounded-[1.75rem] border border-white/40 shadow-[0_4px_24px_rgba(26,115,232,0.08)]" />
                  
                  {/* Carousel */}
                  <div className="relative rounded-[1.25rem] overflow-hidden shadow-xl bg-white border border-gray-100/80">
                    <ReactSlick {...carouselSettings} className="buyer-homepage-carousel">
                      {mockProducts.slice(0, 3).map((product) => (
                        <div key={product.id} className="outline-none">
                          <div className="relative aspect-[4/3]">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {/* Refined gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                              <h3 className="text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-1">
                                {product.name}
                              </h3>
                              <p className="text-white/85 text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                                {product.shopName}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ReactSlick>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <FiltersContent />
            </div>
          </aside>

          {/* Filters - Mobile */}
          <div className="lg:hidden mb-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="flex items-center">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    {t.filters.title}
                  </span>
                  <span className="bg-gray-100 text-[#4A4A4A] px-2 py-0.5 rounded text-xs">
                    {filteredProducts.length}
                  </span>
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
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
                  <Smartphone className="w-6 h-6 text-[#1A73E8]" />
                  {t.products.title}
                </h2>
                <p className="text-sm text-[#8A8A8A]">
                  {t.products.showing} <span className="font-semibold text-[#1A1A1A]">{filteredProducts.length}</span> {t.products.results}
                </p>
              </div>
            </div>

            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Product Grid with Ads */}
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

                      {/* Ad Banner after every 4 products (except last group) */}
                      {groupIndex < Math.ceil(filteredProducts.length / 4) - 1 && (
                        <div className="py-4">
                           <AdBanner language={language} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
            
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <X className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">No products found</h3>
                <p className="text-[#8A8A8A] mt-2">Try adjusting your filters to see more results</p>
                <Button variant="link" onClick={resetFilters} className="mt-4 text-[#1A73E8]">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}