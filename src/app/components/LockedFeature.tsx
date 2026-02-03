"use client"

import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LockedFeatureProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'overlay' | 'card' | 'inline';
  showUpgradeButton?: boolean;
}

export function LockedFeature({ 
  title = "Pro Feature",
  description = "Upgrade to Pro to unlock this feature",
  children,
  className,
  variant = 'overlay',
  showUpgradeButton = true
}: LockedFeatureProps) {
  
  if (variant === 'card') {
    return (
      <div className={cn("relative overflow-hidden rounded-lg border bg-muted/30", className)}>
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] z-10">
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">Pro Only</span>
            {showUpgradeButton && (
              <Link href="/shopkeeper/subscription">
                <Button size="sm" variant="outline" className="text-xs mt-2">
                  Upgrade
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        <Lock className="h-4 w-4" />
        <span>{description}</span>
        {showUpgradeButton && (
          <Link href="/shopkeeper/subscription">
            <Button size="sm" variant="link" className="h-auto p-0 text-primary">
              Upgrade to Pro
            </Button>
          </Link>
        )}
      </div>
    );
  }

  // Default: overlay variant
  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-background shadow-sm", className)}>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 text-center p-6 max-w-md">
          <div className="rounded-full bg-primary/10 p-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
          {showUpgradeButton && (
            <Link href="/shopkeeper/subscription">
              <Button>
                Upgrade to Pro
              </Button>
            </Link>
          )}
        </div>
      </div>
      
      {/* Background Content (Blurred) */}
      <div className="opacity-30 pointer-events-none filter blur-[2px]">
        {children}
      </div>
    </div>
  );
}

// Tooltip for locked features
interface LockedTooltipProps {
  children: React.ReactNode;
  className?: string;
}

export function LockedTooltip({ children, className }: LockedTooltipProps) {
  return (
    <div className={cn("relative group inline-block", className)}>
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        <div className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          <span>Upgrade to Pro to unlock</span>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
