import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  shopName: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  language: 'en' | 'ur';
}

export function ContactModal({ isOpen, onClose, product, language }: ContactModalProps) {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const t = {
    title: language === 'en' ? 'Contact Seller' : 'بیچنے والے سے رابطہ کریں',
    description: language === 'en' 
      ? 'Send a message to the seller or contact via WhatsApp'
      : 'بیچنے والے کو پیغام بھیجیں یا واٹس ایپ کے ذریعے رابطہ کریں',
    messagePlaceholder: language === 'en'
      ? 'Hi, I\'m interested in this product...'
      : 'ہیلو، میں اس پروڈکٹ میں دلچسپی رکھتا ہوں...',
    sendMessage: language === 'en' ? 'Send Message' : 'پیغام بھیجیں',
    whatsapp: language === 'en' ? 'Contact on WhatsApp' : 'واٹس ایپ پر رابطہ کریں',
    close: language === 'en' ? 'Close' : 'بند کریں',
    success: language === 'en' ? 'Message sent successfully!' : 'پیغام کامیابی سے بھیج دیا گیا!',
    successDesc: language === 'en' 
      ? 'The seller will respond to your inquiry shortly.'
      : 'بیچنے والا جلد ہی آپ کے سوال کا جواب دے گا۔',
  };

  const handleSendMessage = () => {
    // Simulate sending message
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setMessage('');
      onClose();
    }, 2000);
  };

  const handleWhatsApp = () => {
    if (!product) return;
    const phoneNumber = '+923001234567'; // Mock phone number
    const text = encodeURIComponent(`Hi, I'm interested in ${product.name} - ₨${product.price.toLocaleString()}`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!isSent ? (
          <>
            <DialogHeader>
              <DialogTitle>{t.title}</DialogTitle>
              <DialogDescription>
                {t.description}
              </DialogDescription>
            </DialogHeader>

            {/* Product Preview */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500">{product.shopName}</p>
                <p className="text-lg font-semibold text-gray-900">
                  ₨{product.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-4">
              <Textarea
                placeholder={t.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <DialogFooter className="flex-col sm:flex-col gap-2">
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {t.sendMessage}
              </Button>
              <Button 
                variant="outline"
                onClick={handleWhatsApp}
                className="w-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t.whatsapp}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t.success}
            </h3>
            <p className="text-sm text-gray-600">
              {t.successDesc}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
