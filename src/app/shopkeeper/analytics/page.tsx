import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import Link from "next/link";
import { LockedFeature } from "@/app/components/LockedFeature";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Detailed insights into your shop performance.
        </p>
      </div>

      <div className="grid gap-6">
        <LockedFeature
          title="Advanced Analytics"
          description="Upgrade to the Pro plan to access advanced analytics, including revenue trends, visitor demographics, and conversion rates."
          className="h-[400px]"
        >
          <div className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="h-32 rounded-md bg-gray-100"></div>
              <div className="h-32 rounded-md bg-gray-100"></div>
              <div className="h-32 rounded-md bg-gray-100"></div>
              <div className="h-32 rounded-md bg-gray-100"></div>
            </div>
            <div className="mt-6 h-64 rounded-md bg-gray-100"></div>
          </div>
        </LockedFeature>
      </div>
    </div>
  );
}