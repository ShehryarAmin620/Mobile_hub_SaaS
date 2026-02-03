"use client"

import { useState } from 'react';
import { Check, ExternalLink, Loader2, CreditCard, Smartphone, Wallet, Lock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface SubscriptionProps {
  language: 'en' | 'ur';
}

export function Subscription({ language }: SubscriptionProps) {
  const [currentPlanId, setCurrentPlanId] = useState<string>('basic');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card");

  const t = {
    subscription: language === 'en' ? 'Subscription' : 'سبسکرپشن',
    currentPlan: language === 'en' ? 'Current Plan' : 'موجودہ پلان',
    upgradeTo: language === 'en' ? 'Upgrade to' : 'اپ گریڈ کریں',
    upgrade: language === 'en' ? 'Upgrade' : 'اپ گریڈ کریں',
    downgrade: language === 'en' ? 'Downgrade' : 'ڈاون گریڈ کریں',
    manageBilling: language === 'en' ? 'Manage Billing' : 'بلنگ کا انتظام کریں',
    renewalDate: language === 'en' ? 'Renewal Date' : 'تجدید کی تاریخ',
    status: language === 'en' ? 'Status' : 'حالت',
    active: language === 'en' ? 'Active' : 'فعال',
    month: language === 'en' ? '/month' : '/ماہ',
    free: language === 'en' ? 'Free' : 'مفت',
    basic: language === 'en' ? 'Basic' : 'بنیادی',
    pro: language === 'en' ? 'Pro' : 'پرو',
    
    // Free plan features
    freePlan: language === 'en' ? 'Free Plan' : 'مفت پلان',
    freeDesc: language === 'en' ? 'Perfect for getting started' : 'شروعات کے لیے بہترین',
    freeFeature1: language === 'en' ? 'Up to 50 products' : '50 تک مصنوعات',
    freeFeature2: language === 'en' ? 'Basic inventory management' : 'بنیادی انوینٹری کا انتظام',
    freeFeature3: language === 'en' ? 'Manual ledger' : 'دستی کھاتہ',
    freeFeature4: language === 'en' ? 'Limited credit tracking' : 'محدود قرض ٹریکنگ',
    
    // Basic plan features
    basicPlan: language === 'en' ? 'Basic Plan' : 'بنیادی پلان',
    basicDesc: language === 'en' ? 'For growing businesses' : 'بڑھتے ہوئے کاروبار کے لیے',
    basicFeature1: language === 'en' ? 'Up to 500 products' : '500 تک مصنوعات',
    basicFeature2: language === 'en' ? 'Advanced inventory tracking' : 'جدید انوینٹری ٹریکنگ',
    basicFeature3: language === 'en' ? 'Automated ledger' : 'خودکار کھاتہ',
    basicFeature4: language === 'en' ? 'Full credit management' : 'مکمل قرض کا انتظام',
    basicFeature5: language === 'en' ? 'Public storefront' : 'عوامی سٹور فرنٹ',
    basicFeature6: language === 'en' ? 'Expense tracking' : 'اخراجات کی نگرانی',
    
    // Pro plan features
    proPlan: language === 'en' ? 'Pro Plan' : 'پرو پلان',
    proDesc: language === 'en' ? 'For established retailers' : 'قائم شدہ خوردہ فروشوں کے لیے',
    proFeature1: language === 'en' ? 'Unlimited products' : 'لامحدود مصنوعات',
    proFeature2: language === 'en' ? 'Advanced analytics' : 'جدید تجزیات',
    proFeature3: language === 'en' ? 'Priority support' : 'ترجیحی معاونت',
    proFeature4: language === 'en' ? 'Multi-user access' : 'ملٹی یوزر رسائی',
    proFeature5: language === 'en' ? 'API access' : 'API رسائی',
    proFeature6: language === 'en' ? 'Custom branding' : 'حسب ضرورت برانڈنگ',
    proFeature7: language === 'en' ? 'Advanced reporting' : 'جدید رپورٹنگ',
    proFeature8: language === 'en' ? 'Bulk operations' : 'بلک آپریشنز',
  };

  const plans = [
    {
      id: 'free',
      name: t.freePlan,
      price: t.free,
      description: t.freeDesc,
      features: [
        t.freeFeature1,
        t.freeFeature2,
        t.freeFeature3,
        t.freeFeature4,
      ],
      isCurrent: currentPlanId === 'free',
    },
    {
      id: 'basic',
      name: t.basicPlan,
      price: '$9.99',
      description: t.basicDesc,
      features: [
        t.basicFeature1,
        t.basicFeature2,
        t.basicFeature3,
        t.basicFeature4,
        t.basicFeature5,
        t.basicFeature6,
      ],
      isCurrent: currentPlanId === 'basic',
    },
    {
      id: 'pro',
      name: t.proPlan,
      price: '$19.99',
      description: t.proDesc,
      features: [
        t.proFeature1,
        t.proFeature2,
        t.proFeature3,
        t.proFeature4,
        t.proFeature5,
        t.proFeature6,
        t.proFeature7,
        t.proFeature8,
      ],
      isCurrent: currentPlanId === 'pro',
    },
  ];

  // Plan hierarchy for determining upgrade/downgrade
  const planHierarchy: { [key: string]: number } = {
    'free': 0,
    'basic': 1,
    'pro': 2,
  };

  const getButtonConfig = (planId: string) => {
    const currentLevel = planHierarchy[currentPlanId];
    const planLevel = planHierarchy[planId];

    if (currentLevel === planLevel) {
      return { text: t.currentPlan, variant: 'outline' as const, disabled: true, isUpgrade: false };
    } else if (planLevel > currentLevel) {
      return { text: t.upgrade, variant: 'default' as const, disabled: false, isUpgrade: true };
    } else {
      return { text: t.downgrade, variant: 'outline' as const, disabled: false, isUpgrade: false };
    }
  };

  const handleUpgrade = (plan: any) => {
    setSelectedPlan(plan);
    setShowCheckout(true);
    setShowSuccess(false);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckout(false);
      setShowSuccess(true);
      setCurrentPlanId(selectedPlan?.id || 'free');
    }, 2000);
  };

  const paymentMethods = [
    { id: "card", name: language === 'en' ? "Credit / Debit Card" : "کریڈٹ / ڈیبٹ کارڈ", icon: CreditCard },
    { id: "jazzcash", name: "JazzCash", icon: Smartphone },
    { id: "mobile", name: language === 'en' ? "Mobile Money" : "موبائل منی", icon: Wallet },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Current Subscription Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                {t.currentPlan}
              </CardTitle>
              <CardDescription className="text-2xl font-semibold text-gray-900 mt-2">
                {currentPlanId}
              </CardDescription>
            </div>
            <Badge variant="default" className="text-sm">
              {t.active}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t.status}:</span>
            <span className="font-medium text-gray-900">{t.active}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t.renewalDate}:</span>
            <span className="font-medium text-gray-900">February 28, 2026</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            {t.manageBilling}
          </Button>
        </CardFooter>
      </Card>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.isCurrent ? 'border-2 border-blue-500' : ''
            }`}
          >
            {plan.isCurrent && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="default" className="bg-blue-500">
                  {t.currentPlan}
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.price !== t.free && (
                  <span className="text-gray-500 text-sm">{t.month}</span>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter>
              {(() => {
                const buttonConfig = getButtonConfig(plan.id);
                return (
                  <Button 
                    variant={buttonConfig.variant} 
                    className="w-full" 
                    disabled={buttonConfig.disabled}
                    onClick={() => buttonConfig.isUpgrade && handleUpgrade(plan)}
                  >
                    {buttonConfig.text}
                  </Button>
                );
              })()}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Checkout Dialog */}
      <Dialog.Root open={showCheckout} onOpenChange={setShowCheckout}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-white shadow-xl duration-200 rounded-lg animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col">
              {/* Header */}
              <div className="border-b px-6 py-4">
                <Dialog.Title className="text-xl font-semibold">
                  {language === 'en' ? 'Complete your purchase' : 'اپنی خریداری مکمل کریں'}
                </Dialog.Title>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'en' ? 'Subscribe to' : 'سبسکرائب کریں'} {selectedPlan?.name} {language === 'en' ? 'Plan' : 'پلان'}
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{language === 'en' ? 'Plan' : 'پلان'}</span>
                    <span className="text-sm">{selectedPlan?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{language === 'en' ? 'Billing cycle' : 'بلنگ سائیکل'}</span>
                    <span className="text-sm">{language === 'en' ? 'Monthly' : 'ماہانہ'}</span>
                  </div>
                  <div className="border-t pt-3 flex items-center justify-between">
                    <span className="font-semibold">{language === 'en' ? 'Total due today' : 'آج کل واجب الادا'}</span>
                    <span className="text-2xl font-bold">{selectedPlan?.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>{language === 'en' ? 'Currency: USD (Auto-detected from Pakistan)' : 'کرنسی: USD (پاکستان سے خودکار ڈیٹیکٹ)'}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">{language === 'en' ? 'Payment method' : 'پرائیمینٹ میتھڈ'}</label>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={cn(
                            "w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left",
                            selectedPaymentMethod === method.id 
                              ? "border-primary bg-primary/5" 
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedPaymentMethod === method.id 
                              ? "border-primary" 
                              : "border-gray-300"
                          )}>
                            {selectedPaymentMethod === method.id && (
                              <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                          </div>
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium">{method.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-blue-50 p-3 rounded">
                  <Lock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>{language === 'en' ? 'Your payment information is encrypted and secure. This is a demo checkout flow.' : 'آپ کی پرائیمینٹ معلومات محفوظ اور خفیہ کاری شدہ ہے۔ یہ ایک ڈیمو چیک آؤٹ فلو ہے۔'}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t px-6 py-4 flex items-center justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCheckout(false)} 
                  disabled={isProcessing}
                >
                  {language === 'en' ? 'Cancel' : 'منسوخ کریں'}
                </Button>
                <Button 
                  onClick={handleCheckout} 
                  disabled={isProcessing}
                  className="min-w-[140px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === 'en' ? 'Processing...' : 'پروسیسنگ...'}
                    </>
                  ) : (
                    <>{language === 'en' ? 'Subscribe now' : 'ابھی سبسکرائب کریں'}</>
                  )}
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-in zoom-in-95">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'en' ? 'Subscription Upgraded!' : 'سبسکرپشن اپ گریڈ!'}
              </h3>
              <p className="text-sm text-gray-600">
                {language === 'en' 
                  ? `You're now subscribed to the ${selectedPlan?.name} plan. Your new features are active immediately.`
                  : `آپ اب ${selectedPlan?.name} پلان میں سبسکرائب ہیں۔ آپ کی نئی خصوصیات فوری طور پر فعال ہیں۔`}
              </p>
              <Button className="w-full" onClick={() => setShowSuccess(false)}>
                {language === 'en' ? 'Continue' : 'جاری رکھیں'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Provider Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-600">
          {language === 'en' 
            ? '💳 Payments are securely processed through Paddle / Lemon Squeezy. Clicking "Upgrade" will redirect you to the secure checkout portal.'
            : '💳 ادائیگیاں Paddle / Lemon Squeezy کے ذریعے محفوظ طریقے سے پروسیس ہوتی ہیں۔ "اپ گریڈ کریں" پر کلک کرنے سے آپ کو محفوظ چیک آؤٹ پورٹل پر بھیج دیا جائے گا۔'}
        </p>
      </div>
    </div>
  );
}