import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Users, Activity, Lock, TrendingUp } from "lucide-react";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { LockedFeature, LockedTooltip } from '@/app/components/LockedFeature';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
            <Link href="/shopkeeper/subscription">
                 <Button>Upgrade Plan</Button>
            </Link>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Inventory
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        
        {/* Locked Feature Card */}
        <Card className="opacity-75 relative overflow-hidden bg-muted/30">
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] z-10">
               <div className="flex flex-col items-center">
                   <Lock className="h-5 w-5 mb-1 text-muted-foreground" />
                   <span className="text-xs font-semibold text-muted-foreground">Pro Only</span>
               </div>
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 opacity-50">
            <CardTitle className="text-sm font-medium">
              Real-Time Sales
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="opacity-50">
            <div className="text-2xl font-bold">...</div>
            <p className="text-xs text-muted-foreground">
               View live activity
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                     {/* Mock List */}
                     <div className="flex items-center">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Olivia Martin</p>
                            <p className="text-sm text-muted-foreground">olivia.martin@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$1,999.00</div>
                     </div>
                     <div className="flex items-center">
                        <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Jackson Lee</p>
                            <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                        </div>
                        <div className="ml-auto font-medium">+$39.00</div>
                     </div>
                </div>
            </CardContent>
        </Card>
        <Card className="col-span-3">
             <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    Latest inventory updates
                </CardDescription>
            </CardHeader>
             <CardContent>
                 <div className="space-y-4">
                     <div className="flex items-center gap-4">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                        </span>
                        <div className="text-sm">Added "iPhone 15 Pro Max"</div>
                     </div>
                     <div className="flex items-center gap-4">
                        <span className="flex h-2 w-2 rounded-full bg-gray-300"></span>
                        <div className="text-sm text-muted-foreground">Updated stock for "Samsung S24"</div>
                     </div>
                 </div>
             </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics - Locked Section */}
      <LockedFeature
        title="Revenue Trends & Insights"
        description="Upgrade to Pro plan to unlock advanced revenue analytics, customer insights, and predictive trends."
        className="h-[300px]"
      >
        <div className="p-6">
          <div className="h-64 rounded-md bg-gray-100 flex items-center justify-center">
            <TrendingUp className="h-16 w-16 text-gray-300" />
          </div>
        </div>
      </LockedFeature>
    </div>
  );
}