import { useState } from 'react';
import { Plus, Upload, Filter, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Badge } from '@/app/components/ui/badge';

interface ExpensesProps {
  language: 'en' | 'ur';
}

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  receipt?: string;
}

const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2026-01-27',
    category: 'Rent',
    amount: 45000,
    description: 'Shop rent for January 2026',
  },
  {
    id: '2',
    date: '2026-01-26',
    category: 'Electricity',
    amount: 12000,
    description: 'Monthly electricity bill',
  },
  {
    id: '3',
    date: '2026-01-25',
    category: 'Transport',
    amount: 8500,
    description: 'Delivery and transportation costs',
  },
  {
    id: '4',
    date: '2026-01-23',
    category: 'Supplier Payment',
    amount: 185000,
    description: 'Payment to Mobile Hub Wholesale',
  },
  {
    id: '5',
    date: '2026-01-20',
    category: 'Electricity',
    amount: 11500,
    description: 'Previous month adjustment',
  },
  {
    id: '6',
    date: '2026-01-15',
    category: 'Transport',
    amount: 6500,
    description: 'Local delivery charges',
  },
];

const categories = [
  'Rent',
  'Electricity',
  'Transport',
  'Supplier Payment',
  'Marketing',
  'Maintenance',
  'Other',
];

export function Expenses({ language }: ExpensesProps) {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('all');

  // Form state
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const t = {
    expenses: language === 'en' ? 'Expense Tracker' : 'اخراجات ٹریکر',
    addExpense: language === 'en' ? 'Add Expense' : 'اخراجات شامل کریں',
    date: language === 'en' ? 'Date' : 'تاریخ',
    category: language === 'en' ? 'Category' : 'قسم',
    amount: language === 'en' ? 'Amount' : 'رقم',
    description: language === 'en' ? 'Description' : 'تفصیل',
    receipt: language === 'en' ? 'Receipt' : 'رسید',
    filterByCategory: language === 'en' ? 'Filter by Category' : 'قسم کے لحاظ سے فلٹر کریں',
    filterByDate: language === 'en' ? 'Filter by Date' : 'تاریخ کے لحاظ سے فلٹر کریں',
    all: language === 'en' ? 'All' : 'تمام',
    rent: language === 'en' ? 'Rent' : 'کرایہ',
    electricity: language === 'en' ? 'Electricity' : 'بجلی',
    transport: language === 'en' ? 'Transport' : 'ٹرانسپورٹ',
    supplierPayment: language === 'en' ? 'Supplier Payment' : 'سپلائر ادائیگی',
    marketing: language === 'en' ? 'Marketing' : 'مارکیٹنگ',
    maintenance: language === 'en' ? 'Maintenance' : 'دیکھ بھال',
    other: language === 'en' ? 'Other' : 'دیگر',
    selectCategory: language === 'en' ? 'Select category' : 'قسم منتخب کریں',
    enterAmount: language === 'en' ? 'Enter amount' : 'رقم درج کریں',
    enterDescription: language === 'en' ? 'Enter description' : 'تفصیل درج کریں',
    uploadReceipt: language === 'en' ? 'Upload Receipt' : 'رسید اپ لوڈ کریں',
    uploadReceiptHint: language === 'en' ? 'Upload a photo of your receipt (optional)' : 'اپنی رسید کی تصویر اپ لوڈ کریں (اختیاری)',
    cancel: language === 'en' ? 'Cancel' : 'منسوخ کریں',
    save: language === 'en' ? 'Save Expense' : 'اخراجات محفوظ کریں',
    totalExpenses: language === 'en' ? 'Total Expenses' : 'کل اخراجات',
    noExpenses: language === 'en' ? 'No expenses found' : 'کوئی اخراجات نہیں ملے',
    last7Days: language === 'en' ? 'Last 7 Days' : 'گزشتہ 7 دن',
    last30Days: language === 'en' ? 'Last 30 Days' : 'گزشتہ 30 دن',
    thisMonth: language === 'en' ? 'This Month' : 'اس ماہ',
  };

  const categoryTranslation: Record<string, string> = {
    Rent: t.rent,
    Electricity: t.electricity,
    Transport: t.transport,
    'Supplier Payment': t.supplierPayment,
    Marketing: t.marketing,
    Maintenance: t.maintenance,
    Other: t.other,
  };

  // Calculate total
  const filteredExpenses = expenses.filter((expense) => {
    if (filterCategory !== 'all' && expense.category !== filterCategory) return false;
    return true;
  });

  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExpense = () => {
    setCategory('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setIsAddDialogOpen(true);
  };

  const handleSaveExpense = () => {
    const newExpense: Expense = {
      id: String(expenses.length + 1),
      date: date,
      category: category,
      amount: parseInt(amount),
      description: description,
    };
    setExpenses([newExpense, ...expenses]);
    setIsAddDialogOpen(false);
  };

  const canSave = category && amount && description;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Total */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="bg-white rounded-lg border border-gray-200 px-6 py-4">
          <div className="text-sm font-medium text-gray-600 mb-1">{t.totalExpenses}</div>
          <div className="text-3xl font-semibold text-gray-900">
            ₨{totalExpenses.toLocaleString()}
          </div>
        </div>
        <Button onClick={handleAddExpense}>
          <Plus className="w-4 h-4 mr-2" />
          {t.addExpense}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.filterByCategory} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {categoryTranslation[cat] || cat}
              </SelectItem>
            ))}
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

      {/* Expenses Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filteredExpenses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">{t.noExpenses}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.date}</TableHead>
                <TableHead>{t.category}</TableHead>
                <TableHead>{t.description}</TableHead>
                <TableHead className="text-right">{t.amount}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium text-gray-900">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {categoryTranslation[expense.category] || expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {expense.description}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-red-600">
                    ₨{expense.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t.addExpense}</DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Add a new expense to track your business costs'
                : 'اپنے کاروبار کے اخراجات کو ٹریک کرنے کے لیے نیا اخراجات شامل کریں'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t.category}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCategory} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {categoryTranslation[cat] || cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t.amount}</Label>
                <Input
                  type="number"
                  placeholder={t.enterAmount}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>{t.date}</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t.description}</Label>
              <Textarea
                placeholder={t.enterDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.uploadReceipt}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t.uploadReceiptHint}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'en' ? 'Click to upload or drag and drop' : 'اپ لوڈ کرنے کے لیے کلک کریں یا ڈریگ اینڈ ڈراپ کریں'}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSaveExpense} disabled={!canSave}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Info Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          {language === 'en' 
            ? '💡 Expenses are automatically added to your ledger for accurate P&L tracking.'
            : '💡 اخراجات خودکار طور پر آپ کے کھاتے میں شامل ہوتے ہیں تاکہ درست منافع/نقصان کی نگرانی ہو سکے۔'}
        </p>
      </div>
    </div>
  );
}
