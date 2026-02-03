import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Smartphone, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function InventoryPage() {
  const currentProducts = 48; // Mock current product count
  const productLimit = 50; // Free plan limit
  const isNearLimit = currentProducts >= productLimit * 0.9;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
            <p className="text-muted-foreground">Manage your mobile devices and stock.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
        </Button>
      </div>

      {/* Product Limit Warning */}
      {isNearLimit && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-amber-900">
                Approaching product limit
              </div>
              <div className="text-sm text-amber-700 mt-1">
                You're using {currentProducts} of {productLimit} products on the Free plan.
              </div>
            </div>
            <Link href="/shopkeeper/subscription">
              <Button variant="outline" size="sm" className="border-amber-300 hover:bg-amber-100">
                Upgrade Plan
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center space-x-2">
        <Input className="max-w-sm" placeholder="Search inventory..." />
        <Button variant="secondary"><Search className="h-4 w-4" /></Button>
      </div>

      {/* GSMArena Add Flow Mock */}
      <Card className="bg-slate-50 border-dashed border-2">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Quick Add from GSMArena
              </CardTitle>
              <CardDescription>Search for a device model to auto-fill specifications.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="flex gap-4">
                  <Input placeholder="e.g. iPhone 15 Pro" />
                  <Button variant="outline">Search Database</Button>
              </div>
          </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm text-left">
                      <thead className="[&_tr]:border-b">
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                          <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle font-medium">iPhone 15 Pro Max</td>
                              <td className="p-4 align-middle"><Badge variant="default">In Stock</Badge></td>
                              <td className="p-4 align-middle">$1,199.00</td>
                              <td className="p-4 align-middle">12</td>
                              <td className="p-4 align-middle"><Button variant="ghost" size="sm">Edit</Button></td>
                          </tr>
                           <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">Samsung Galaxy S24 Ultra</td>
                              <td className="p-4 align-middle"><Badge variant="secondary">Low Stock</Badge></td>
                              <td className="p-4 align-middle">$1,299.00</td>
                              <td className="p-4 align-middle">3</td>
                              <td className="p-4 align-middle"><Button variant="ghost" size="sm">Edit</Button></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}