import { useState } from 'react';
import { Plus, X, Check, Copy, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';

interface ImeiInputProps {
  language: 'en' | 'ur';
  imeis: string[];
  onImeisChange: (imeis: string[]) => void;
  existingImeis?: string[]; // For validation against duplicates
}

export function ImeiInput({ language, imeis, onImeisChange, existingImeis = [] }: ImeiInputProps) {
  const [singleImei, setSingleImei] = useState('');
  const [bulkImeis, setBulkImeis] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  const t = {
    title: language === 'en' ? 'IMEI Numbers' : 'IMEI نمبرز',
    description: language === 'en' ? 'Enter IMEI numbers for product identification' : 'پروڈکٹ کی شناخت کے لیے IMEI نمبر درج کریں',
    singleMode: language === 'en' ? 'Single Entry' : 'واحد اندراج',
    bulkMode: language === 'en' ? 'Bulk Paste' : 'بلک پیسٹ',
    enterImei: language === 'en' ? 'Enter 15-digit IMEI' : '15 ہندسوں کا IMEI درج کریں',
    add: language === 'en' ? 'Add' : 'شامل کریں',
    bulkPlaceholder: language === 'en' 
      ? 'Paste multiple IMEIs (one per line)\nExample:\n123456789012345\n234567890123456' 
      : 'متعدد IMEIs پیسٹ کریں (ہر لائن میں ایک)\nمثال:\n123456789012345\n234567890123456',
    processBulk: language === 'en' ? 'Process Bulk' : 'بلک پروسیس کریں',
    imeiList: language === 'en' ? 'IMEI List' : 'IMEI فہرست',
    noImeis: language === 'en' ? 'No IMEI numbers added yet' : 'ابھی تک کوئی IMEI نمبر شامل نہیں کیا گیا',
    remove: language === 'en' ? 'Remove' : 'ہٹائیں',
    copy: language === 'en' ? 'Copy' : 'کاپی کریں',
    errorInvalidLength: language === 'en' ? 'IMEI must be exactly 15 digits' : 'IMEI بالکل 15 ہندسے ہونا چاہیے',
    errorDuplicate: language === 'en' ? 'This IMEI already exists' : 'یہ IMEI پہلے سے موجود ہے',
    errorInvalidFormat: language === 'en' ? 'IMEI must contain only numbers' : 'IMEI میں صرف نمبر ہونے چاہیے',
    copied: language === 'en' ? 'Copied!' : 'کاپی ہوگیا!',
  };

  const validateImei = (imei: string): string | null => {
    const trimmed = imei.trim();
    
    if (trimmed.length !== 15) {
      return t.errorInvalidLength;
    }
    
    if (!/^\d{15}$/.test(trimmed)) {
      return t.errorInvalidFormat;
    }
    
    if (imeis.includes(trimmed) || existingImeis.includes(trimmed)) {
      return t.errorDuplicate;
    }
    
    return null;
  };

  const handleAddSingle = () => {
    setError('');
    const validationError = validateImei(singleImei);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onImeisChange([...imeis, singleImei.trim()]);
    setSingleImei('');
  };

  const handleBulkProcess = () => {
    setError('');
    const lines = bulkImeis.split('\n').map(line => line.trim()).filter(Boolean);
    const newImeis: string[] = [];
    const errors: string[] = [];
    
    lines.forEach((line, index) => {
      const validationError = validateImei(line);
      if (validationError) {
        errors.push(`Line ${index + 1}: ${validationError}`);
      } else if (!newImeis.includes(line)) {
        newImeis.push(line);
      }
    });
    
    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }
    
    onImeisChange([...imeis, ...newImeis]);
    setBulkImeis('');
  };

  const handleRemove = (index: number) => {
    onImeisChange(imeis.filter((_, i) => i !== index));
  };

  const handleCopy = (imei: string) => {
    navigator.clipboard.writeText(imei);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddSingle();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-[#1A1A1A]">{t.title}</Label>
        <p className="text-xs text-[#8A8A8A] mt-1">{t.description}</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'single' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('single')}
          className={mode === 'single' ? 'bg-[#1A73E8]' : ''}
        >
          {t.singleMode}
        </Button>
        <Button
          type="button"
          variant={mode === 'bulk' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMode('bulk')}
          className={mode === 'bulk' ? 'bg-[#1A73E8]' : ''}
        >
          {t.bulkMode}
        </Button>
      </div>

      {/* Single Entry Mode */}
      {mode === 'single' && (
        <div className="flex gap-2">
          <Input
            placeholder={t.enterImei}
            value={singleImei}
            onChange={(e) => {
              setSingleImei(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            maxLength={15}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddSingle}
            disabled={!singleImei.trim()}
            className="bg-[#1A73E8] hover:bg-[#1557b0] text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t.add}
          </Button>
        </div>
      )}

      {/* Bulk Entry Mode */}
      {mode === 'bulk' && (
        <div className="space-y-2">
          <Textarea
            placeholder={t.bulkPlaceholder}
            value={bulkImeis}
            onChange={(e) => {
              setBulkImeis(e.target.value);
              setError('');
            }}
            rows={6}
            className="font-mono text-sm"
          />
          <Button
            type="button"
            onClick={handleBulkProcess}
            disabled={!bulkImeis.trim()}
            className="bg-[#1A73E8] hover:bg-[#1557b0] text-white w-full"
          >
            <Check className="w-4 h-4 mr-2" />
            {t.processBulk}
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
          <pre className="text-xs text-red-700 whitespace-pre-wrap font-sans">{error}</pre>
        </div>
      )}

      {/* IMEI List */}
      {imeis.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-[#1A1A1A]">{t.imeiList}</Label>
            <Badge variant="secondary">{imeis.length} IMEI{imeis.length !== 1 ? 's' : ''}</Badge>
          </div>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-48 overflow-y-auto">
            {imeis.map((imei, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-mono text-sm text-[#1A1A1A]">{imei}</span>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(imei)}
                    className="text-[#8A8A8A] hover:text-[#1A1A1A] h-7 px-2"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-700 h-7 px-2"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {imeis.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-[#8A8A8A]">{t.noImeis}</p>
        </div>
      )}
    </div>
  );
}
