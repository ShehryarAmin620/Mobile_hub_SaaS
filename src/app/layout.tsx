import React from 'react';
import "@/styles/theme.css";

export const metadata = {
  title: 'Global Mobile Retailer',
  description: 'Premium SaaS Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body>
        <div className="min-h-screen bg-gray-50/50">
          {children}
        </div>
      </body>
    </html>
  );
}
