"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink, Loader2, CreditCard, Smartphone, Wallet, Lock, Calendar } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    features: [
      "Basic inventory management", 
      "Simple storefront", 
      "Up to 50 products",
      "Community support"
    ],
    current: true,
  },
  {
    id: "basic",
    name: "Basic",
    price: "$9.99",
    features: [
      "Advanced inventory", 
      "Custom domain", 
      "Up to 500 products", 
      "Basic analytics",
      "Email support"
    ],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19.99",
    popular: true,
    features: [
      "Unlimited products", 
      "Priority support", 
      "Advanced analytics", 
      "API access", 
      "Multiple users",
      "Custom integrations"
    ],
    current: false,
  },
];

export default function SubscriptionPage() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof PLANS[0] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState<string>("free");
  const [renewalDate, setRenewalDate] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("card");

  const handleUpgrade = (plan: typeof PLANS[0]) => {
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
      setCurrentPlanId(selectedPlan?.id || "free");
      
      // Calculate renewal date (30 days from now)
      const renewal = new Date();
      renewal.setDate(renewal.getDate() + 30);
      setRenewalDate(renewal.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }, 2000);
  };

  const paymentMethods = [
    { id: "card", name: "Credit / Debit Card", icon: CreditCard },
    { id: "jazzcash", name: "JazzCash", icon: Smartphone },
    { id: "mobile", name: "Mobile Money", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription</h2>
        <p className="text-muted-foreground">
          Manage your plan and billing details.
        </p>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center gap-2">
            <Check className="h-4 w-4" />
            Plan upgraded successfully! Your billing cycle has been updated.
        </div>
      )}

      {/* Plans Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrentPlan = plan.id === currentPlanId;
          const isPro = plan.popular;
          
          return (
            <Card 
              key={plan.id} 
              className={cn(
                "flex flex-col relative",
                isCurrentPlan && "border-primary shadow-md",
                isPro && "ring-2 ring-primary/20"
              )}
            >
              {isPro && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {isCurrentPlan && <Badge variant="secondary">Active</Badge>}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {isCurrentPlan && renewalDate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3" />
                    <span>Renews on {renewalDate}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isCurrentPlan ? (
                  <Button className="w-full" variant="outline" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => handleUpgrade(plan)}
                    variant={isPro ? "default" : "outline"}
                  >
                    Upgrade to {plan.name}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Billing Portal Section */}
      <div className="border-t pt-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Billing Management</h3>
          <p className="text-sm text-muted-foreground">Update payment methods, view invoices, and manage your subscription</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    Payment Method
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Update your payment information
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                Manage Payment
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    Billing Portal
                  </div>
                  <div className="text-sm text-muted-foreground">
                    View invoices and billing history
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                Open Portal
                <ExternalLink className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Cancellation Option */}
        {currentPlanId !== "free" && (
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium text-red-900">Cancel Subscription</div>
                  <div className="text-sm text-red-700">
                    Your subscription will remain active until {renewalDate}
                  </div>
                </div>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                  Cancel Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Mock Checkout Overlay (Paddle/Lemon Squeezy style) */}
      <Dialog.Root open={showCheckout} onOpenChange={setShowCheckout}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-white shadow-xl duration-200 rounded-lg animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col">
              {/* Header */}
              <div className="border-b px-6 py-4">
                <Dialog.Title className="text-xl font-semibold">
                  Complete your purchase
                </Dialog.Title>
                <p className="text-sm text-muted-foreground mt-1">
                  Subscribe to {selectedPlan?.name} Plan
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-6 space-y-6">
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Plan</span>
                    <span className="text-sm">{selectedPlan?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Billing cycle</span>
                    <span className="text-sm">Monthly</span>
                  </div>
                  <div className="border-t pt-3 flex items-center justify-between">
                    <span className="font-semibold">Total due today</span>
                    <span className="text-2xl font-bold">{selectedPlan?.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    <span>Currency: USD (Auto-detected from Pakistan)</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Payment method</label>
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
                  <p>Your payment information is encrypted and secure. This is a demo checkout flow.</p>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t px-6 py-4 flex items-center justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCheckout(false)} 
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCheckout} 
                  disabled={isProcessing}
                  className="min-w-[140px]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Subscribe now</>
                  )}
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}