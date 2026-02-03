import { useState } from 'react';
import { Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

interface LedgerProps {
  language: 'en' | 'ur';
}

interface LedgerEntry {
  id: string;
  date: string;
  type: 'purchase' | 'sale' | 'expense' | 'credit';
  description: string;
  amount: number;
  reference: string;
}

const mockLedgerData: LedgerEntry[] = [
  {
    id: '1',
    date: '2026-01-28',
    type: 'sale',
    description: 'iPhone 15 Pro 256GB sold to customer',
    amount: 315000,
    reference: 'INV-2026-001',
  },
  {
    id: '2',
    date: '2026-01-28',
    type: 'purchase',
    description: 'Samsung S24 Ultra purchased from supplier',
    amount: -245000,
    reference: 'PO-2026-045',
  },
  {
    id: '3',
    date: '2026-01-27',
    type: 'expense',
    description: 'Shop rent payment for January',
    amount: -45000,
    reference: 'EXP-2026-012',
  },
  {
    id: '4',
    date: '2026-01-27',
    type: 'credit',
    description: 'Credit payment received from Ali Mobile Shop',
    amount: 28000,
    reference: 'CR-2026-008',
  },
  {
    id: '5',
    date: '2026-01-26',
    type: 'sale',
    description: 'Xiaomi 14 Pro 256GB sold to customer',
    amount: 152000,
    reference: 'INV-2026-002',
  },
  {
    id: '6',
    date: '2026-01-26',
    type: 'expense',
    description: 'Electricity bill payment',
    amount: -12000,
    reference: 'EXP-2026-013',
  },
  {
    id: '7',
    date: '2026-01-25',
    type: 'purchase',
    description: 'Google Pixel 8 Pro purchased from supplier',
    amount: -185000,
    reference: 'PO-2026-046',
  },
  {
    id: '8',
    date: '2026-01-25',
    type: 'sale',
    description: 'OnePlus 12 sold to customer',
    amount: 125000,
    reference: 'INV-2026-003',
  },
];

export function Ledger({ language }: LedgerProps) {
  const [entries] = useState<LedgerEntry[]>(mockLedgerData);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  const t = {
    ledger: language === 'en' ? 'Ledger' : 'کھاتہ',
    totalIncome: language === 'en' ? 'Total Income' : 'کل آمدنی',
    totalExpenses: language === 'en' ? 'Total Expenses' : 'کل اخراجات',
    netPL: language === 'en' ? 'Net P&L' : 'خالص منافع/نقصان',
    filterByType: language === 'en' ? 'Filter by Type' : 'قسم کے لحاظ سے فلٹر کریں',
    filterByDate: language === 'en' ? 'Filter by Date' : 'تاریخ کے لحاظ سے فلٹر کریں',
    all: language === 'en' ? 'All' : 'تمام',
    purchase: language === 'en' ? 'Purchase' : 'خریداری',
    sale: language === 'en' ? 'Sale' : 'فروخت',
    expense: language === 'en' ? 'Expense' : 'اخراجات',
    credit: language === 'en' ? 'Credit' : 'قرض',
    date: language === 'en' ? 'Date' : 'تاریخ',
    type: language === 'en' ? 'Type' : 'قسم',
    description: language === 'en' ? 'Description' : 'تفصیل',
    amount: language === 'en' ? 'Amount' : 'رقم',
    reference: language === 'en' ? 'Reference' : 'حوالہ',
    last7Days: language === 'en' ? 'Last 7 Days' : 'گزشتہ 7 دن',
    last30Days: language === 'en' ? 'Last 30 Days' : 'گزشتہ 30 دن',
    thisMonth: language === 'en' ? 'This Month' : 'اس ماہ',
    noEntries: language === 'en' ? 'No ledger entries found' : 'کوئی کھاتہ اندراجات نہیں ملے',
  };

  // Calculate totals
  const totalIncome = entries
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalExpenses = Math.abs(
    entries
      .filter((e) => e.amount < 0)
      .reduce((sum, e) => sum + e.amount, 0)
  );
  
  const netPL = totalIncome - totalExpenses;

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    if (filterType !== 'all' && entry.type !== filterType) return false;
    // Date filtering would be implemented here
    return true;
  });

  const getTypeBadge = (type: string) => {
    const typeMap = {
      purchase: { label: t.purchase, variant: 'secondary' as const },
      sale: { label: t.sale, variant: 'default' as const },
      expense: { label: t.expense, variant: 'destructive' as const },
      credit: { label: t.credit, variant: 'default' as const },
    };
    return typeMap[type as keyof typeof typeMap] || { label: type, variant: 'secondary' as const };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
              {t.totalIncome}
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#1A1A1A]">
              ₨{totalIncome.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
              {t.totalExpenses}
            </CardTitle>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#1A1A1A]">
              ₨{totalExpenses.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
              {t.netPL}
            </CardTitle>
            {netPL >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-semibold ${netPL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₨{Math.abs(netPL).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8A8A8A]" />
          <span className="text-sm font-medium text-[#4A4A4A]">Filters:</span>
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.filterByType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="purchase">{t.purchase}</SelectItem>
            <SelectItem value="sale">{t.sale}</SelectItem>
            <SelectItem value="expense">{t.expense}</SelectItem>
            <SelectItem value="credit">{t.credit}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterDate} onValueChange={setFilterDate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.filterByDate} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="7days">{t.last7Days}</SelectItem>
            <SelectItem value="30days">{t.last30Days}</SelectItem>
            <SelectItem value="thisMonth">{t.thisMonth}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-[#8A8A8A]">{t.noEntries}</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200 hover:bg-transparent">
                <TableHead className="text-[#4A4A4A] font-medium">{t.date}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.type}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.description}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.amount}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.reference}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => {
                const typeBadge = getTypeBadge(entry.type);
                return (
                  <TableRow key={entry.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <TableCell className="font-medium text-[#1A1A1A]">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={typeBadge.variant}
                        className={entry.type === 'expense' ? 'bg-red-100 text-red-700' : 
                                   entry.type === 'sale' ? 'bg-green-100 text-green-700' : 
                                   ''}
                      >
                        {typeBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-[#4A4A4A]">
                      {entry.description}
                    </TableCell>
                    <TableCell className={`font-semibold ${
                      entry.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.amount >= 0 ? '+' : ''}₨{Math.abs(entry.amount).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-[#8A8A8A]">
                      {entry.reference}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Read-only Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {language === 'en' 
            ? '📘 This is a read-only ledger. Entries are automatically generated from your sales, purchases, expenses, and credit transactions.'
            : '📘 یہ صرف پڑھنے کے لیے کھاتہ ہے۔ اندراجات خودکار طور پر آپ کی فروخت، خریداری، اخراجات اور قرض لین دین سے تیار ہوتے ہیں۔'}
        </p>
      </div>
    </div>
  );
}