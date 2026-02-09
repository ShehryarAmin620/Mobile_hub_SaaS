import { User, Save } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface ProfileProps {
  language: 'en' | 'ur';
}

export function Profile({ language }: ProfileProps) {
  const t = {
    profile: language === 'en' ? 'Profile' : 'پروفائل',
    personalInfo: language === 'en' ? 'Personal Information' : 'ذاتی معلومات',
    personalInfoDesc: language === 'en' ? 'Update your personal details' : 'اپنی ذاتی تفصیلات کو اپ ڈیٹ کریں',
    shopInfo: language === 'en' ? 'Shop Information' : 'دکان کی معلومات',
    shopInfoDesc: language === 'en' ? 'Manage your shop details' : 'اپنی دکان کی تفصیلات کا انتظام کریں',
    fullName: language === 'en' ? 'Full Name' : 'پورا نام',
    email: language === 'en' ? 'Email' : 'ای میل',
    phone: language === 'en' ? 'Phone Number' : 'فون نمبر',
    shopName: language === 'en' ? 'Shop Name' : 'دکان کا نام',
    address: language === 'en' ? 'Address' : 'پتہ',
    city: language === 'en' ? 'City' : 'شہر',
    country: language === 'en' ? 'Country' : 'ملک',
    saveChanges: language === 'en' ? 'Save Changes' : 'تبدیلیاں محفوظ کریں',
    selectCity: language === 'en' ? 'Select city' : 'شہر منتخب کریں',
    selectCountry: language === 'en' ? 'Select country' : 'ملک منتخب کریں',
    pakistan: language === 'en' ? 'Pakistan' : 'پاکستان',
  };

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta'];

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {t.personalInfo}
              </CardTitle>
              <CardDescription>
                {t.personalInfoDesc}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.fullName}</Label>
              <Input defaultValue="Ahmed Khan" />
            </div>
            <div className="space-y-2">
              <Label>{t.email}</Label>
              <Input type="email" defaultValue="ahmed@mobilehub.pk" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t.phone}</Label>
            <Input type="tel" defaultValue="+92 300 1234567" />
          </div>
        </CardContent>
      </Card>

      {/* Shop Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t.shopInfo}
          </CardTitle>
          <CardDescription>
            {t.shopInfoDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.shopName}</Label>
            <Input defaultValue="Mobile Hub" />
          </div>

          <div className="space-y-2">
            <Label>{t.address}</Label>
            <Input defaultValue="Shop #42, Saddar Market" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.city}</Label>
              <Select defaultValue="Karachi">
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCity} />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t.country}</Label>
              <Select defaultValue="Pakistan" disabled>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCountry} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pakistan">{t.pakistan}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="w-4 h-4 mr-2" />
          {t.saveChanges}
        </Button>
      </div>
    </div>
  );
}
