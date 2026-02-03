import React from 'react';
import { Header } from "@/components/Header";

export default function ShopkeeperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header role="shopkeeper" />
      <div className="flex-1 space-y-4 p-8 pt-6">
        {children}
      </div>
    </div>
  );
}
