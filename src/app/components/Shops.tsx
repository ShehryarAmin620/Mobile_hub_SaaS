import { Store, MapPin, Search, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

interface ShopsProps {
  language: 'en' | 'ur';
}

interface Shop {
  id: string;
  shopName: string;
  ownerEmail: string;
  city: string;
  publicStatus: 'on' | 'off';
  subscriptionTier: 'Free' | 'Basic' | 'Premium' | 'Enterprise';
}

const mockShops: Shop[] = [
  {
    id: '1',
    shopName: 'Tech Haven',
    ownerEmail: 'ahmed.khan@example.com',
    city: 'Karachi',
    publicStatus: 'on',
    subscriptionTier: 'Premium',
  },
  {
    id: '2',
    shopName: 'Mobile World',
    ownerEmail: 'muhammad.ali@example.com',
    city: 'Dubai',
    publicStatus: 'on',
    subscriptionTier: 'Enterprise',
  },
  {
    id: '3',
    shopName: 'Gadget Store',
    ownerEmail: 'usman.sheikh@example.com',
    city: 'Lahore',
    publicStatus: 'off',
    subscriptionTier: 'Premium',
  },
  {
    id: '4',
    shopName: 'Phone Plaza',
    ownerEmail: 'bilal.ahmed@example.com',
    city: 'Riyadh',
    publicStatus: 'on',
    subscriptionTier: 'Basic',
  },
  {
    id: '5',
    shopName: 'Smart Devices',
    ownerEmail: 'ahmed.khan@example.com',
    city: 'Islamabad',
    publicStatus: 'on',
    subscriptionTier: 'Premium',
  },
  {
    id: '6',
    shopName: 'Digital Hub',
    ownerEmail: 'muhammad.ali@example.com',
    city: 'Abu Dhabi',
    publicStatus: 'on',
    subscriptionTier: 'Enterprise',
  },
];

export function Shops({ language }: ShopsProps) {
  const text = {
    en: {
      title: 'Shops Management',
      subtitle: 'Monitor and manage registered shops',
      shopName: 'Shop Name',
      owner: 'Owner',
      city: 'City',
      publicStatus: 'Status',
      subscriptionTier: 'Tier',
      on: 'Public',
      off: 'Hidden',
      noShops: 'No shops found',
      showing: 'Showing',
      of: 'of',
      shops: 'shops',
      search: 'Search shops...',
      filters: 'Filters',
    },
    ur: {
      title: 'دکانوں کا انتظام',
      subtitle: 'رجسٹرڈ دکانوں کی نگرانی اور انتظام کریں',
      shopName: 'دکان کا نام',
      owner: 'مالک',
      city: 'شہر',
      publicStatus: 'حیثیت',
      subscriptionTier: 'درجہ',
      on: 'عوامی',
      off: 'پوشیدہ',
      noShops: 'کوئی دکان نہیں ملی',
      showing: 'دکھا رہے ہیں',
      of: 'میں سے',
      shops: 'دکانیں',
      search: 'دکانیں تلاش کریں...',
      filters: 'فلٹرز',
    },
  };

  const t = text[language];

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Enterprise':
        return 'bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-100';
      case 'Premium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-100';
      case 'Basic':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Free':
        return 'bg-slate-50 text-slate-600 border-slate-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{t.title}</h1>
          <p className="text-[#8A8A8A] mt-1">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder={t.search} 
                className="w-64 pl-9 border-0 bg-transparent focus-visible:ring-0 h-9" 
              />
            </div>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" size="sm" className="text-[#8A8A8A]">
              <Filter className="w-4 h-4 mr-2" />
              {t.filters}
            </Button>
        </div>
      </div>

      {/* Table */}
      <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
         <Table className="bg-white">
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-transparent border-b border-gray-200">
              <TableHead className="w-[250px] text-[#4A4A4A] font-medium">{t.shopName}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.owner}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.city}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.publicStatus}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.subscriptionTier}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShops.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16 text-[#8A8A8A] border-b border-gray-200">
                  {t.noShops}
                </TableCell>
              </TableRow>
            ) : (
              mockShops.map((shop) => (
                <TableRow key={shop.id} className="group hover:bg-gray-50 border-b border-gray-100 transition-colors duration-200">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#1A73E8] border border-blue-100">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#1A1A1A]">{shop.shopName}</div>
                        <div className="text-xs text-[#8A8A8A]">ID: {shop.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#4A4A4A]">{shop.ownerEmail}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[#4A4A4A]">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {shop.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        shop.publicStatus === 'on'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-100 text-gray-600 border-gray-200'
                      }
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${shop.publicStatus === 'on' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                      {shop.publicStatus === 'on' ? t.on : t.off}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTierBadgeColor(shop.subscriptionTier)}>
                      {shop.subscriptionTier}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <p className="text-sm text-[#8A8A8A]">
          {language === 'en'
            ? `${t.showing} ${mockShops.length} ${t.of} ${mockShops.length} ${t.shops}`
            : `${mockShops.length} ${t.of} ${mockShops.length} ${t.shops} ${t.showing}`}
        </p>
         <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled>Previous</Button>
             <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
      </div>
    </div>
  );
}