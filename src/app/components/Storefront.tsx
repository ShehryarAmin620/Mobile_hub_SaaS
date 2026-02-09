import { useState } from 'react';
import { Globe, Eye, Save } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface StorefrontProps {
  language: 'en' | 'ur';
}

export function Storefront({ language }: StorefrontProps) {
  const [isPublic, setIsPublic] = useState(true);
  const [shopTitle, setShopTitle] = useState('Mobile Hub - Premium Smartphones');
  const [description, setDescription] = useState(
    'Welcome to Mobile Hub! We offer the latest smartphones from top brands including Apple, Samsung, Xiaomi, and more. Quality products at competitive prices with warranty. Visit us today!'
  );
  const [keywords, setKeywords] = useState('mobile phones, smartphones, iPhone, Samsung, Xiaomi, Pakistan');
  const [slug] = useState('mobile-hub-karachi');

  const t = {
    storefront: language === 'en' ? 'Storefront Management' : 'سٹور فرنٹ کا انتظام',
    publicShop: language === 'en' ? 'Public Shop' : 'عوامی دکان',
    publicShopDesc: language === 'en' ? 'Make your shop visible to buyers' : 'اپنی دکان خریداروں کو دکھائیں',
    shopTitle: language === 'en' ? 'Shop Page Title' : 'دکان کا عنوان',
    shopTitlePlaceholder: language === 'en' ? 'Enter your shop title' : 'اپنی دکان کا عنوان درج کریں',
    description: language === 'en' ? 'Description' : 'تفصیل',
    descriptionPlaceholder: language === 'en' ? 'Describe your shop and products...' : 'اپنی دکان اور مصنوعات کی تفصیل دیں...',
    seoKeywords: language === 'en' ? 'SEO Keywords' : 'SEO مطلوبہ الفاظ',
    seoKeywordsPlaceholder: language === 'en' ? 'Enter keywords separated by commas' : 'کاما سے الگ کر کے مطلوبہ الفاظ درج کریں',
    previewLink: language === 'en' ? 'Preview Link' : 'پیش منظر لنک',
    viewStorefront: language === 'en' ? 'View Storefront' : 'سٹور فرنٹ دیکھیں',
    saveChanges: language === 'en' ? 'Save Changes' : 'تبدیلیاں محفوظ کریں',
    status: language === 'en' ? 'Status' : 'حالت',
    active: language === 'en' ? 'Active' : 'فعال',
    inactive: language === 'en' ? 'Inactive' : 'غیر فعال',
    seoSettings: language === 'en' ? 'SEO Settings' : 'SEO ترتیبات',
    seoDesc: language === 'en' ? 'Optimize your shop for search engines' : 'اپنی دکان کو سرچ انجن کے لیے بہتر بنائیں',
    publicUrl: language === 'en' ? 'Public URL' : 'عوامی URL',
    tip: language === 'en' ? 'Tip' : 'تجویز',
    tipText: language === 'en' 
      ? 'Only products marked as "Public" will appear on your storefront. Make sure to set your products as public in the Inventory section.'
      : 'صرف "عوامی" کے طور پر نشان زد مصنوعات آپ کے سٹور فرنٹ پر ظاہر ہوں گی۔ یقینی بنائیں کہ آپ نے اپنی مصنوعات کو انوینٹری سیکشن میں عوامی کے طور پر سیٹ کیا ہے۔',
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {t.status}
              </CardTitle>
              <CardDescription>
                {t.publicShopDesc}
              </CardDescription>
            </div>
            <Badge variant={isPublic ? 'default' : 'secondary'} className="text-sm">
              {isPublic ? t.active : t.inactive}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <Label htmlFor="public-toggle" className="cursor-pointer">
                {t.publicShop}
              </Label>
            </div>
            <Switch
              id="public-toggle"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
        </CardContent>
      </Card>

      {/* Shop Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t.shopTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.shopTitle}</Label>
            <Input
              value={shopTitle}
              onChange={(e) => setShopTitle(e.target.value)}
              placeholder={t.shopTitlePlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label>{t.description}</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.descriptionPlaceholder}
              rows={5}
            />
            <p className="text-xs text-gray-500">
              {description.length} / 500 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t.seoSettings}
          </CardTitle>
          <CardDescription>
            {t.seoDesc}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.seoKeywords}</Label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder={t.seoKeywordsPlaceholder}
            />
            <p className="text-xs text-gray-500">
              {language === 'en' 
                ? 'Add relevant keywords to help buyers find your shop'
                : 'خریداروں کو اپنی دکان تلاش کرنے میں مدد کے لیے متعلقہ مطلوبہ الفاظ شامل کریں'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview Link */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            {t.previewLink}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.publicUrl}</Label>
            <div className="flex items-center gap-2">
              <Input
                value={`https://retailer.app/shop/${slug}`}
                readOnly
                className="bg-gray-50"
              />
              <Button variant="outline" size="icon">
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full sm:w-auto">
            <Eye className="w-4 h-4 mr-2" />
            {t.viewStorefront}
          </Button>
        </CardContent>
      </Card>

      {/* Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-2">
          <span className="text-blue-600 font-semibold">💡 {t.tip}:</span>
          <p className="text-sm text-blue-800">
            {t.tipText}
          </p>
        </div>
      </div>

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
