import { useState, useEffect } from 'react';
import { MessageCircle, Store, MapPin, ChevronLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { Skeleton } from '@/app/components/ui/skeleton';
import { ContactModal } from '@/app/components/ContactModal';
import { AdBanner } from '@/app/components/AdBanner';
import { motion } from 'motion/react';

interface ProductDetailsProps {
  language: 'en' | 'ur';
  onNavigate?: (page: string) => void;
  onNavigateToShop?: () => void;
}

// Mock product data with full details
const mockProduct = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 15 Pro',
  variant: '256GB Black',
  price: 315000,
  availability: 'in-stock' as const,
  stockLevel: 12,
  images: [
    'https://images.unsplash.com/photo-1625102217544-a096a17018f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBwcm8lMjBibGFjayUyMHBob25lfGVufDF8fHx8MTc3MDEwMjE0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1698314439902-70a5966b8cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjAxNSUyMHBybyUyMGJhY2slMjBjYW1lcmElMjB0aXRhbml1bXxlbnwxfHx8fDE3NzAxMDIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1637806481950-72a42962afad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBkaXNwbGF5JTIwYW5nbGUlMjB2aWV3fGVufDF8fHx8MTc3MDEwMjEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1709306413255-2fff2dc4277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjAxNSUyMGNhbWVyYSUyMGRldGFpbCUyMGNsb3NldXB8ZW58MXx8fHwxNzcwMTAyMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1727726093325-7c55155611be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjAxNSUyMHBybyUyMHRpdGFuaXVtJTIwZWRnZXxlbnwxfHx8fDE3NzAxMDIxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ],
  specs: {
    Display: '6.1" Super Retina XDR OLED',
    Processor: 'Apple A17 Pro',
    RAM: '8GB',
    Storage: '256GB',
    'Main Camera': '48MP + 12MP + 12MP',
    Battery: '3274mAh',
    OS: 'iOS 17',
    SIM: 'Dual SIM (nano-SIM and eSIM)',
  },
  shop: {
    id: 'shop-1',
    name: 'Mobile Hub',
    city: 'Karachi',
    phone: '+92 300 1234567',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
  },
};

export function ProductDetails({ language, onNavigate, onNavigateToShop }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSpecs, setShowSpecs] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    back: language === 'en' ? 'Back to Products' : 'مصنوعات پر واپس',
    inStock: language === 'en' ? 'In Stock' : 'اسٹاک میں',
    lowStock: language === 'en' ? 'Low Stock' : 'کم اسٹاک',
    outOfStock: language === 'en' ? 'Out of Stock' : 'اسٹاک ختم',
    unitsAvailable: language === 'en' ? 'units available' : 'یونٹس دستیاب',
    contactWhatsApp: language === 'en' ? 'Contact on WhatsApp' : 'واٹس ایپ پر رابطہ کریں',
    messageShop: language === 'en' ? 'Message Shop' : 'دکان کو پیغام بھیجیں',
    specifications: language === 'en' ? 'Specifications' : 'تفصیلات',
    showMore: language === 'en' ? 'Show More' : 'مزید دکھائیں',
    showLess: language === 'en' ? 'Show Less' : 'کم دکھائیں',
    shopInfo: language === 'en' ? 'Shop Information' : 'دکان کی معلومات',
    viewShop: language === 'en' ? 'View Shop' : 'دکان دیکھیں',
  };

  const handleWhatsApp = () => {
    const phoneNumber = mockProduct.shop.phone.replace(/\s/g, '');
    const text = encodeURIComponent(
      `Hi, I'm interested in ${mockProduct.brand} ${mockProduct.model} ${mockProduct.variant} - ₨${mockProduct.price.toLocaleString()}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const getAvailabilityBadge = () => {
    if (mockProduct.availability === 'out-of-stock') {
      return <Badge variant="destructive">{t.outOfStock}</Badge>;
    }
    if (mockProduct.stockLevel < 5) {
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">{t.lowStock}</Badge>;
    }
    return <Badge variant="default" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">{t.inStock}</Badge>;
  };

  const specsData = Object.entries(mockProduct.specs);
  const displayedSpecs = showSpecs ? specsData : specsData.slice(0, 4);

  const contactProduct = {
    id: mockProduct.id,
    image: mockProduct.images[0],
    name: `${mockProduct.brand} ${mockProduct.model} ${mockProduct.variant}`,
    price: mockProduct.price,
    shopName: mockProduct.shop.name,
  };

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate?.('home')}
            className="flex items-center gap-2 text-sm font-medium text-[#8A8A8A] hover:text-[#1A73E8] mb-8 transition-colors duration-200 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            {t.back}
          </motion.button>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Main Image with Hover Zoom */}
              <div className="relative group">
                <div className="aspect-square bg-[#FAFAFA] rounded-[1.25rem] overflow-hidden border border-gray-200 shadow-lg">
                  {imageLoading && (
                    <div className="absolute inset-0 z-10">
                      <Skeleton className="w-full h-full" />
                    </div>
                  )}
                  <img
                    src={mockProduct.images[selectedImage]}
                    alt={`${mockProduct.brand} ${mockProduct.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    onLoad={() => setImageLoading(false)}
                    loading="eager"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-5 gap-3">
                {mockProduct.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedImage(index);
                      setImageLoading(true);
                    }}
                    className={`aspect-square bg-[#FAFAFA] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? 'border-[#1A73E8] ring-2 ring-[#1A73E8]/20 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Product Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-8"
            >
              {/* Sticky Price & Actions Section */}
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Product Header */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h1 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] tracking-tight leading-tight mb-2">
                        {mockProduct.brand} {mockProduct.model}
                      </h1>
                      <p className="text-lg text-[#8A8A8A]">
                        {mockProduct.variant}
                      </p>
                    </div>
                    {getAvailabilityBadge()}
                  </div>

                  {/* Price Section */}
                  <div className="flex items-baseline gap-3 pt-2">
                    <div className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] tracking-tight">
                      ₨{mockProduct.price.toLocaleString()}
                    </div>
                    {mockProduct.availability !== 'out-of-stock' && (
                      <span className="text-sm text-[#8A8A8A]">
                        {mockProduct.stockLevel} {t.unitsAvailable}
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Primary Actions */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full text-base py-6 bg-[#1A73E8] hover:bg-[#1557b0] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02]"
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t.contactWhatsApp}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-base py-6 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    {t.messageShop}
                  </Button>
                </div>

                <Separator />

                {/* Specifications */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#1A1A1A]">
                      {t.specifications}
                    </h2>
                    <button
                      onClick={() => setShowSpecs(!showSpecs)}
                      className="text-sm font-medium text-[#1A73E8] hover:text-[#1557b0] transition-colors duration-200"
                    >
                      {showSpecs ? t.showLess : t.showMore}
                    </button>
                  </div>

                  <div className="bg-[#FAFAFA] rounded-xl p-6 space-y-4 border border-gray-100">
                    {displayedSpecs.map(([key, value]) => (
                      <div key={key} className="flex items-start justify-between gap-6">
                        <span className="text-sm text-[#8A8A8A] min-w-[100px]">
                          {key}
                        </span>
                        <span className="text-sm font-medium text-[#1A1A1A] text-right flex-1">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Shop Information Card */}
                <Card className="border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-[#1A1A1A]">
                      {t.shopInfo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                        <img
                          src={mockProduct.shop.logo}
                          alt={mockProduct.shop.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[#1A1A1A] mb-1">
                          {mockProduct.shop.name}
                        </div>
                        <div className="text-sm text-[#8A8A8A] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {mockProduct.shop.city}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-200"
                      onClick={onNavigateToShop}
                    >
                      <Store className="w-4 h-4 mr-2" />
                      {t.viewShop}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Ad Banner Below Product Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-16"
          >
            <AdBanner language={language} />
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        product={contactProduct}
        language={language}
      />
    </>
  );
}