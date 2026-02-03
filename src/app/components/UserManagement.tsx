import { useState } from 'react';
import { MoreVertical, Ban, Shield, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"

interface UserManagementProps {
  language: 'en' | 'ur';
}

interface User {
  id: string;
  email: string;
  role: 'Admin' | 'Shopkeeper' | 'Buyer';
  country: string;
  subscriptionTier: 'Free' | 'Basic' | 'Premium' | 'Enterprise';
  status: 'active' | 'banned';
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'ahmed.khan@example.com',
    role: 'Shopkeeper',
    country: 'Pakistan',
    subscriptionTier: 'Premium',
    status: 'active',
    lastActive: '2 mins ago',
  },
  {
    id: '2',
    email: 'sarah.malik@example.com',
    role: 'Buyer',
    country: 'United States',
    subscriptionTier: 'Free',
    status: 'active',
    lastActive: '1 hour ago',
  },
  {
    id: '3',
    email: 'muhammad.ali@example.com',
    role: 'Shopkeeper',
    country: 'United Arab Emirates',
    subscriptionTier: 'Enterprise',
    status: 'active',
    lastActive: '3 hours ago',
  },
  {
    id: '4',
    email: 'fatima.hassan@example.com',
    role: 'Buyer',
    country: 'United Kingdom',
    subscriptionTier: 'Basic',
    status: 'active',
    lastActive: '1 day ago',
  },
  {
    id: '5',
    email: 'admin@retailer.com',
    role: 'Admin',
    country: 'Pakistan',
    subscriptionTier: 'Enterprise',
    status: 'active',
    lastActive: 'Just now',
  },
  {
    id: '6',
    email: 'usman.sheikh@example.com',
    role: 'Shopkeeper',
    country: 'Pakistan',
    subscriptionTier: 'Premium',
    status: 'active',
    lastActive: '5 mins ago',
  },
  {
    id: '7',
    email: 'aisha.qureshi@example.com',
    role: 'Buyer',
    country: 'Canada',
    subscriptionTier: 'Free',
    status: 'active',
    lastActive: '2 days ago',
  },
  {
    id: '8',
    email: 'bilal.ahmed@example.com',
    role: 'Shopkeeper',
    country: 'Saudi Arabia',
    subscriptionTier: 'Basic',
    status: 'active',
    lastActive: '1 week ago',
  },
];

export function UserManagement({ language }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionUser, setActionUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<'ban' | 'override' | null>(null);

  const text = {
    en: {
      title: 'User Management',
      subtitle: 'Manage system access and permissions',
      filters: 'Filters',
      role: 'Role',
      all: 'All Roles',
      subscriptionTier: 'All Tiers',
      email: 'Email / User',
      country: 'Country',
      status: 'Status',
      actions: 'Actions',
      banUser: 'Ban User',
      unbanUser: 'Unban User',
      overrideSubscription: 'Override Subscription',
      banConfirmTitle: 'Ban User Access',
      banConfirmDesc: 'Are you sure you want to ban this user? They will lose access to the platform immediately.',
      overrideConfirmTitle: 'Modify Subscription',
      overrideConfirmDesc: 'Manually override the subscription tier for this user.',
      cancel: 'Cancel',
      confirm: 'Confirm Action',
      active: 'Active',
      banned: 'Banned',
      noUsers: 'No users found matching your criteria',
      search: 'Search users...',
      lastActive: 'Last Active',
    },
    ur: {
      title: 'صارف کا انتظام',
      subtitle: 'سسٹم تک رسائی اور اجازتوں کا نظم کریں',
      filters: 'فلٹرز',
      role: 'کردار',
      all: 'تمام کردار',
      subscriptionTier: 'تمام درجات',
      email: 'ای میل / صارف',
      country: 'ملک',
      status: 'حیثیت',
      actions: 'اعمال',
      banUser: 'صارف پر پابندی',
      unbanUser: 'صارف کو بحال کریں',
      overrideSubscription: 'سبسکرپشن تبدیل کریں',
      banConfirmTitle: 'صارف پر پابندی',
      banConfirmDesc: 'کیا آپ واقعی اس صارف پر پابندی لگانا چاہتے ہیں؟ وہ فوری طور پر پلیٹ فارم تک رسائی کھو دیں گے۔',
      overrideConfirmTitle: 'سبسکرپشن تبدیل کریں',
      overrideConfirmDesc: 'اس صارف کے لیے دستی طور پر سبسکرپشن ٹائر تبدیل کریں۔',
      cancel: 'منسوخ کریں',
      confirm: 'تصدیق کریں',
      active: 'فعال',
      banned: 'پابندی شدہ',
      noUsers: 'آپ کے معیار سے مطابقت رکھنے والا کوئی صارف نہیں ملا',
      search: 'صارفین تلاش کریں...',
      lastActive: 'آخری بار فعال',
    },
  };

  const t = text[language];

  const filteredUsers = users.filter((user) => {
    if (roleFilter !== 'all' && user.role !== roleFilter) return false;
    if (tierFilter !== 'all' && user.subscriptionTier !== tierFilter) return false;
    if (searchQuery && !user.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleBanUser = () => {
    if (actionUser) {
      setUsers(
        users.map((u) =>
          u.id === actionUser.id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
        )
      );
    }
    setActionUser(null);
    setActionType(null);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200';
      case 'Shopkeeper':
        return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
      case 'Buyer':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Enterprise':
        return 'bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-100';
      case 'Premium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-100';
      case 'Basic':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Free':
        return 'bg-slate-50 text-slate-600 border-slate-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <TooltipProvider>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{t.title}</h1>
            <p className="text-[#8A8A8A] mt-1">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder={t.search} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-9 border-0 bg-transparent focus-visible:ring-0 h-9" 
                />
             </div>
             <div className="h-6 w-px bg-gray-200" />
             <Button variant="ghost" size="sm" className="text-[#8A8A8A]">
               <Filter className="w-4 h-4 mr-2" />
               {t.filters}
             </Button>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder={t.role} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Shopkeeper">Shopkeeper</SelectItem>
              <SelectItem value="Buyer">Buyer</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder={t.subscriptionTier} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.subscriptionTier}</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <Table className="bg-white">
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-transparent border-b border-gray-200">
                <TableHead className="w-[300px] text-[#4A4A4A] font-medium">{t.email}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.role}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.country}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.subscriptionTier}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.status}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.lastActive}</TableHead>
                <TableHead className="text-right text-[#4A4A4A] font-medium">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16 border-b border-gray-200">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-lg font-medium text-[#1A1A1A]">{t.noUsers}</p>
                      <p className="text-sm text-[#8A8A8A] mt-1">Try adjusting your filters or search query</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="group hover:bg-gray-50 border-b border-gray-100 transition-colors duration-200">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1A1A1A]">{user.email}</span>
                        <span className="text-xs text-[#8A8A8A] font-mono">ID: {user.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`rounded-full px-3 py-0.5 ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-[#4A4A4A] font-medium">{user.country}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`rounded-md px-2.5 ${getTierBadgeColor(user.subscriptionTier)}`}>
                        {user.subscriptionTier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.status === 'active' ? (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {t.active}
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-red-700 bg-red-50 px-2 py-1 rounded-full border border-red-100">
                             <AlertCircle className="w-3 h-3" />
                             {t.banned}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-[#8A8A8A]">{user.lastActive}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className="h-8 w-8 text-[#8A8A8A] hover:text-[#1A73E8] hover:bg-blue-50"
                               onClick={() => {
                                setActionUser(user);
                                setActionType('override');
                              }}
                             >
                               <Shield className="w-4 h-4" />
                             </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                             <p>{t.overrideSubscription}</p>
                           </TooltipContent>
                         </Tooltip>

                         <Tooltip>
                           <TooltipTrigger asChild>
                             <Button 
                               variant="ghost" 
                               size="icon" 
                               className={`h-8 w-8 ${user.status === 'active' ? 'text-[#8A8A8A] hover:text-red-600 hover:bg-red-50' : 'text-red-600 bg-red-50'}`}
                               onClick={() => {
                                setActionUser(user);
                                setActionType('ban');
                              }}
                             >
                               {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                             </Button>
                           </TooltipTrigger>
                           <TooltipContent>
                             <p>{user.status === 'active' ? t.banUser : t.unbanUser}</p>
                           </TooltipContent>
                         </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-sm text-[#8A8A8A]">
            {language === 'en'
              ? `Showing ${filteredUsers.length} of ${users.length} users`
              : `${users.length} میں سے ${filteredUsers.length} صارفین دکھا رہے ہیں`}
          </p>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled>Previous</Button>
             <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>

        {/* Ban Confirmation Dialog */}
        <AlertDialog open={actionType === 'ban'} onOpenChange={() => setActionType(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.banConfirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>{t.banConfirmDesc}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setActionType(null)}>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleBanUser} className="bg-red-600 hover:bg-red-700 text-white">{t.confirm}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Override Subscription Dialog */}
        <AlertDialog open={actionType === 'override'} onOpenChange={() => setActionType(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.overrideConfirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>{t.overrideConfirmDesc}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <Select
                defaultValue={actionUser?.subscriptionTier}
                onValueChange={(value) => {
                  if (actionUser) {
                    setUsers(
                      users.map((u) =>
                        u.id === actionUser.id
                          ? { ...u, subscriptionTier: value as User['subscriptionTier'] }
                          : u
                      )
                    );
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setActionType(null)}>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={() => setActionType(null)} className="bg-[#1A73E8] hover:bg-[#1557b0]">{t.confirm}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}