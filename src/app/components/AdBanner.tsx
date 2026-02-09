interface AdBannerProps {
  language: 'en' | 'ur';
}

export function AdBanner({ language }: AdBannerProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 text-center">
      <p className="text-sm text-gray-500 mb-2">
        {language === 'en' ? 'Advertisement' : 'اشتہار'}
      </p>
      <div className="text-gray-400 text-sm">
        {language === 'en' 
          ? 'Google AdSense Ad Space - 728x90'
          : 'گوگل ایڈسینس اشتہار کی جگہ - 728x90'}
      </div>
    </div>
  );
}
