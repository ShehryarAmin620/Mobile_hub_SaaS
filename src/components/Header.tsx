import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  role?: 'admin' | 'shopkeeper' | 'buyer';
}

export function Header({ role = 'buyer' }: HeaderProps) {
  const handleSignOut = () => {
    // In a real app, clear auth tokens here
    window.location.href = '/auth/login';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center gap-4 px-4 sm:px-6">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <ShoppingBag className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Mobile Hub</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {role === 'buyer' && (
              <>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/">Products</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/shops">Shops</a>
              </>
            )}
            {role === 'shopkeeper' && (
              <>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/shopkeeper/dashboard">Dashboard</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/shopkeeper/inventory">Inventory</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/shopkeeper/subscription">Subscription</a>
              </>
            )}
             {role === 'admin' && (
              <>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/admin/dashboard">Overview</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/admin/users">Users</a>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             {/* Search bar could go here */}
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@user" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {role}@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
