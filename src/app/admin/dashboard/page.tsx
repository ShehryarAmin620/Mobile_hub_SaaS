import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Activity, AlertTriangle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Admin Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#4A4A4A]">Total Users</CardTitle>
            <Users className="h-4 w-4 text-[#8A8A8A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1A1A1A]">12,345</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#4A4A4A]">Platform Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-[#8A8A8A]" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-[#1A1A1A]">$124,500</div>
            </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#4A4A4A]">System Logs</CardTitle>
                <Activity className="h-4 w-4 text-[#8A8A8A]" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-[#1A1A1A]">All Systems Normal</div>
            </CardContent>
        </Card>
      </div>
      
      <Card className="border-gray-200 shadow-sm">
          <CardHeader>
              <CardTitle className="text-[#1A1A1A]">System Logs & Activity</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                          <p className="text-sm text-[#1A1A1A] font-medium">User login success</p>
                          <p className="text-xs text-[#8A8A8A] mt-0.5">admin@gmail.com • 2024-05-20 10:00:01</p>
                      </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                          <p className="text-sm text-[#1A1A1A] font-medium">New subscription purchase</p>
                          <p className="text-xs text-[#8A8A8A] mt-0.5">Pro Plan • 2024-05-20 10:05:23</p>
                      </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                          <p className="text-sm text-[#1A1A1A] font-medium">High traffic detected</p>
                          <p className="text-xs text-[#8A8A8A] mt-0.5">/shops • 2024-05-20 10:12:00</p>
                      </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                          <p className="text-sm text-[#1A1A1A] font-medium">User registered</p>
                          <p className="text-xs text-[#8A8A8A] mt-0.5">shopkeeper@gmail.com • 2024-05-20 10:15:45</p>
                      </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                          <p className="text-sm text-[#1A1A1A] font-medium">Inventory update triggered</p>
                          <p className="text-xs text-[#8A8A8A] mt-0.5">ID#8823 • 2024-05-20 10:20:11</p>
                      </div>
                  </div>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}