import { useState } from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface AdsControlProps {
  language: 'en' | 'ur';
}

export function AdsControl({ language }: AdsControlProps) {
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [adDensity, setAdDensity] = useState<'low' | 'medium' | 'high'>('medium');

  const text = {
    en: {
      title: 'Google AdSense Settings',
      description: 'Manage advertisement settings for your platform',
      enableAds: 'Enable Google AdSense',
      enableAdsDesc: 'Show advertisements on public buyer-facing pages',
      adDensity: 'Ad Density',
      adDensityDesc: 'Control how frequently ads appear on pages',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      note: 'Note',
      noteText: 'Ads appear only on public buyer-facing pages. They will not be shown on admin or shopkeeper dashboards.',
      status: 'Current Status',
      enabled: 'Ads are currently enabled',
      disabled: 'Ads are currently disabled',
      density: 'Density Level',
    },
    ur: {
      title: 'گوگل ایڈسینس کی ترتیبات',
      description: 'اپنے پلیٹ فارم کے لیے اشتہارات کی ترتیبات کا انتظام کریں',
      enableAds: 'گوگل ایڈسینس فعال کریں',
      enableAdsDesc: 'عوامی خریدار کے صفحات پر اشتہارات دکھائیں',
      adDensity: 'اشتہار کی کثافت',
      adDensityDesc: 'کنٹرول کریں کہ صفحات پر اشتہارات کتنی بار ظاہر ہوتے ہیں',
      low: 'کم',
      medium: 'درمیانی',
      high: 'زیادہ',
      note: 'نوٹ',
      noteText: 'اشتہارات صرف عوامی خریدار کے صفحات پر ظاہر ہوتے ہیں۔ وہ ایڈمن یا دکاندار کے ڈیش بورڈز پر نہیں دکھائے جائیں گے۔',
      status: 'موجودہ حیثیت',
      enabled: 'اشتہارات فی الوقت فعال ہیں',
      disabled: 'اشتہارات فی الوقت غیر فعال ہیں',
      density: 'کثافت کی سطح',
    },
  };

  const t = text[language];

  const getDensityLabel = (density: string) => {
    switch (density) {
      case 'low':
        return t.low;
      case 'medium':
        return t.medium;
      case 'high':
        return t.high;
      default:
        return density;
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Main Settings Card */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Enable/Disable Ads */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <Label htmlFor="ads-enabled" className="text-base font-semibold text-gray-900">
                {t.enableAds}
              </Label>
              <p className="text-sm text-gray-600">{t.enableAdsDesc}</p>
            </div>
            <Switch
              id="ads-enabled"
              checked={adsEnabled}
              onCheckedChange={setAdsEnabled}
              className="mt-1"
            />
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Ad Density */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="ad-density" className="text-base font-semibold text-gray-900">
                {t.adDensity}
              </Label>
              <p className="text-sm text-gray-600 mt-1">{t.adDensityDesc}</p>
            </div>
            <Select
              value={adDensity}
              onValueChange={(value) => setAdDensity(value as 'low' | 'medium' | 'high')}
              disabled={!adsEnabled}
            >
              <SelectTrigger id="ad-density" className="w-full max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{t.low}</SelectItem>
                <SelectItem value="medium">{t.medium}</SelectItem>
                <SelectItem value="high">{t.high}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t.status}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-700">{t.enableAds}</span>
            <span
              className={`text-sm font-semibold ${
                adsEnabled ? 'text-green-600' : 'text-gray-600'
              }`}
            >
              {adsEnabled ? t.enabled : t.disabled}
            </span>
          </div>
          {adsEnabled && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-gray-700">{t.density}</span>
              <span className="text-sm font-semibold text-gray-900">
                {getDensityLabel(adDensity)}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Information Note */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-blue-900">{t.note}</p>
              <p className="text-sm text-blue-700">{t.noteText}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
