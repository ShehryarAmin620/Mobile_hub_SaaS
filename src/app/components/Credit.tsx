import { useState } from 'react';
import { Plus, Search, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
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
import { Badge } from '@/app/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ShopkeeperDirectory, type Shopkeeper } from '@/app/components/credit/ShopkeeperDirectory';
import { Checkbox } from '@/app/components/ui/checkbox';

interface CreditProps {
  language: 'en' | 'ur';
}

interface CreditItem {
  id: string;
  counterparty: string;
  product: string;
  quantity: number;
  amount: number;
  dueDate: string;
  status: 'pending' | 'accepted' | 'overdue' | 'paid';
  type: 'lend' | 'borrow';
  imeis?: string[];
}

// Mock credit data for demonstration (user can create real entries via Lend Item flow)
const mockCreditData: CreditItem[] = [
  {
    id: "cr-1",
    counterparty: "Ali Mobile Center",
    product: "iPhone 15 Pro 256GB Black",
    quantity: 2,
    amount: 420000,
    dueDate: "2025-03-20",
    status: "accepted",
    type: "lend",
    imeis: ["356789112233445", "356789112233446"],
  },
  {
    id: "cr-2",
    counterparty: "Tech Zone Saddar",
    product: "Samsung S24 Ultra 512GB Gray",
    quantity: 1,
    amount: 310000,
    dueDate: "2025-03-10",
    status: "overdue",
    type: "lend",
    imeis: ["358901223344556"],
  },
  {
    id: "cr-3",
    counterparty: "Galaxy Traders",
    product: "Google Pixel 8 Pro 128GB",
    quantity: 1,
    amount: 185000,
    dueDate: "2025-03-25",
    status: "pending",
    type: "borrow",
  },
];

const mockInventoryProducts = [
  'iPhone 15 Pro 256GB Black',
  'Samsung S24 Ultra 512GB Gray',
  'Xiaomi 14 Pro 256GB White',
  'Google Pixel 8 Pro 128GB Obsidian',
  'OnePlus 12 256GB Green',
];

export function Credit({ language }: CreditProps) {
  const [creditItems, setCreditItems] = useState<CreditItem[]>(mockCreditData);
  const [isLendDialogOpen, setIsLendDialogOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchShopkeeper, setSearchShopkeeper] = useState('');
  
  // Shopkeeper management state - completely dynamic, starts empty
  const [shopkeepers, setShopkeepers] = useState<Shopkeeper[]>([]);
  
  // Lend form state
  const [selectedShopkeeper, setSelectedShopkeeper] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [agreedPrice, setAgreedPrice] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedImeis, setSelectedImeis] = useState<string[]>([]);

  const t = {
    credit: language === 'en' ? 'Credit (Lend / Borrow)' : 'قرض (دینا / لینا)',
    owedToMe: language === 'en' ? 'Owed to Me' : 'مجھے واجب الادا',
    iOwe: language === 'en' ? 'I Owe' : 'میں واجب الادا ہوں',
    lendItem: language === 'en' ? 'Lend Item' : 'چیز قرض دیں',
    counterparty: language === 'en' ? 'Counterparty' : 'فریق',
    product: language === 'en' ? 'Product' : 'پروڈکٹ',
    quantity: language === 'en' ? 'Quantity' : 'مقدار',
    amount: language === 'en' ? 'Amount' : 'رقم',
    dueDate: language === 'en' ? 'Due Date' : 'واجب الادا تاریخ',
    status: language === 'en' ? 'Status' : 'حالت',
    pending: language === 'en' ? 'Pending' : 'زیر التواء',
    accepted: language === 'en' ? 'Accepted' : 'قبول شدہ',
    overdue: language === 'en' ? 'Overdue' : 'واجب الادا',
    paid: language === 'en' ? 'Paid' : 'ادا شدہ',
    totalOwedToMe: language === 'en' ? 'Total Owed to Me' : 'کل مجھے واجب الادا',
    totalIOwe: language === 'en' ? 'Total I Owe' : 'کل میں واجب الادا ہوں',
    noCredit: language === 'en' ? 'No credit entries found' : 'کوئی قرض کی اندراج نہیں ملی',
    
    // Lend dialog
    step1Title: language === 'en' ? 'Step 1: Search Shopkeeper' : 'مرحلہ 1: دکاندار تلاش کریں',
    step2Title: language === 'en' ? 'Step 2: Select Product' : 'مرحلہ 2: پروڈکٹ منتخب کریں',
    step3Title: language === 'en' ? 'Step 3: Confirm Details' : 'مرحلہ 3: تفصیلات کی تصدیق کریں',
    searchShopkeeper: language === 'en' ? 'Search shopkeeper by name or city...' : 'نام یا شہر سے دکاندار تلاش کریں...',
    selectShopkeeper: language === 'en' ? 'Select a shopkeeper' : 'دکاندار منتخب کریں',
    selectProduct: language === 'en' ? 'Select product from inventory' : 'انوینٹری سے پروڈکٹ منتخب کریں',
    enterQuantity: language === 'en' ? 'Enter quantity' : 'مقدار درج کریں',
    enterAgreedPrice: language === 'en' ? 'Enter agreed price (total)' : 'متفقہ قیمت درج کریں (کل)',
    selectDueDate: language === 'en' ? 'Select due date' : 'واجب الادا تاریخ منتخب کریں',
    next: language === 'en' ? 'Next' : 'اگلا',
    back: language === 'en' ? 'Back' : 'واپس',
    cancel: language === 'en' ? 'Cancel' : 'منسوخ کریں',
    confirm: language === 'en' ? 'Confirm & Send' : 'تصدیق کریں اور بھیجیں',
    city: language === 'en' ? 'City' : 'شہر',
    manageShopkeepers: language === 'en' ? 'Manage Shopkeepers' : 'دکانداروں کا انتظام',
    addShopkeeper: language === 'en' ? 'Add Shopkeeper' : 'دکاندار شامل کریں',
  };
  
const handleConfirmLend = () => {
  const newEntry: CreditItem = {
    id: `cr-${Date.now()}`,
    counterparty: selectedShopkeeper,
    product: selectedProduct,
    quantity: Number(quantity),
    amount: Number(agreedPrice),
    dueDate: dueDate,
    status: "pending",
    type: "lend",
    imeis: selectedImeis.length > 0 ? selectedImeis : undefined,
  };

  setCreditItems(prev => [...prev, newEntry]);
  setIsLendDialogOpen(false);
};

  const lendItems = creditItems.filter((item) => item.type === 'lend');
  const borrowItems = creditItems.filter((item) => item.type === 'borrow');

  const totalOwedToMe = lendItems
    .filter((item) => item.status !== 'paid')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIOwe = borrowItems
    .filter((item) => item.status !== 'paid')
    .reduce((sum, item) => sum + item.amount, 0);

  const filteredShopkeepers = shopkeepers.filter((shop) =>
    `${shop.name} ${shop.city}`.toLowerCase().includes(searchShopkeeper.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: t.pending, variant: 'secondary' as const, icon: Clock },
      accepted: { label: t.accepted, variant: 'default' as const, icon: CheckCircle },
      overdue: { label: t.overdue, variant: 'destructive' as const, icon: AlertCircle },
      paid: { label: t.paid, variant: 'secondary' as const, icon: CheckCircle },
    };
    return statusMap[status as keyof typeof statusMap];
  };

  const handleLendItem = () => {
    setCurrentStep(1);
    setSearchShopkeeper('');
    setSelectedShopkeeper('');
    setSelectedProduct('');
    setQuantity('');
    setAgreedPrice('');
    setDueDate('');
    setSelectedImeis([]);
    setIsLendDialogOpen(true);
  };

  const canProceedStep1 = selectedShopkeeper;
  const canProceedStep2 = selectedProduct && quantity && agreedPrice && dueDate;

  const CreditTable = ({ items }: { items: CreditItem[] }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {items.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-[#8A8A8A]">{t.noCredit}</p>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="text-[#4A4A4A] font-medium">{t.counterparty}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.product}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.quantity}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.amount}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.dueDate}</TableHead>
              <TableHead className="text-[#4A4A4A] font-medium">{t.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const statusBadge = getStatusBadge(item.status);
              const StatusIcon = statusBadge.icon;
              return (
                <TableRow key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <TableCell className="font-medium text-[#1A1A1A]">
                    {item.counterparty}
                  </TableCell>
                  <TableCell className="text-sm text-[#4A4A4A]">
                    {item.product}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.quantity}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-[#1A1A1A]">
                    ₨{item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-[#8A8A8A]">
                    {new Date(item.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge 
                        variant={statusBadge.variant} 
                        className={`flex items-center gap-1 w-fit ${
                            item.status === 'overdue' ? 'bg-red-100 text-red-700' :
                            item.status === 'accepted' ? 'bg-[#1A73E8] text-white' :
                            ''
                        }`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusBadge.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards with Manage Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#1A1A1A]">{t.credit}</h2>
        <Button onClick={() => setIsDirectoryOpen(true)} variant="outline">
          <Users className="w-4 h-4 mr-2" />
          {t.manageShopkeepers}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
              {t.totalOwedToMe}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-green-600">
              ₨{totalOwedToMe.toLocaleString()}
            </div>
            <p className="text-xs text-[#8A8A8A] mt-1">
              {lendItems.filter((i) => i.status === 'overdue').length} {t.overdue}
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-[#4A4A4A]">
              {t.totalIOwe}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-red-600">
              ₨{totalIOwe.toLocaleString()}
            </div>
            <p className="text-xs text-[#8A8A8A] mt-1">
              {borrowItems.filter((i) => i.status === 'overdue').length} {t.overdue}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <Tabs defaultValue="lend" className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="lend">{t.owedToMe}</TabsTrigger>
              <TabsTrigger value="borrow">{t.iOwe}</TabsTrigger>
            </TabsList>
            <Button onClick={handleLendItem} className="bg-[#1A73E8] hover:bg-[#1557b0] text-white">
              <Plus className="w-4 h-4 mr-2" />
              {t.lendItem}
            </Button>
          </div>

          <TabsContent value="lend">
            <CreditTable items={lendItems} />
          </TabsContent>

          <TabsContent value="borrow">
            <CreditTable items={borrowItems} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Lend Item Dialog */}
      <Dialog open={isLendDialogOpen} onOpenChange={setIsLendDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.lendItem}</DialogTitle>
            <DialogDescription>
              {currentStep === 1 && t.step1Title}
              {currentStep === 2 && t.step2Title}
              {currentStep === 3 && t.step3Title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Step 1: Search Shopkeeper */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label>{t.searchShopkeeper}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={t.searchShopkeeper}
                      value={searchShopkeeper}
                      onChange={(e) => setSearchShopkeeper(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.selectShopkeeper}</Label>
                  <div className="border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
                    {shopkeepers.length === 0 ? (
                      <div className="p-8 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-[#8A8A8A] mb-3">
                          {language === 'en' 
                            ? 'No shopkeepers added yet. Add shopkeepers first to lend items.' 
                            : 'ابھی تک کوئی دکاندار شامل نہیں کیا گیا۔ آئٹم قرض دینے کے لیے پہلے دکاندار شامل کریں۔'}
                        </p>
                        <Button
                          onClick={() => {
                            setIsLendDialogOpen(false);
                            setIsDirectoryOpen(true);
                          }}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          {t.addShopkeeper}
                        </Button>
                      </div>
                    ) : filteredShopkeepers.length === 0 ? (
                      <div className="p-6 text-center">
                        <p className="text-sm text-[#8A8A8A]">
                          {language === 'en' ? 'No shopkeepers match your search' : 'آپ کی تلاش سے کوئی دکاندار مماثل نہیں'}
                        </p>
                      </div>
                    ) : (
                      filteredShopkeepers.map((shop) => (
                        <button
                          key={shop.id}
                          onClick={() => setSelectedShopkeeper(shop.name)}
                          className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                            selectedShopkeeper === shop.name ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <div className="font-medium text-[#1A1A1A]">{shop.name}</div>
                          <div className="text-sm text-[#8A8A8A]">{t.city}: {shop.city}</div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Select Product */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label>{t.product}</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectProduct} />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInventoryProducts.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t.quantity}</Label>
                    <Input
                      type="number"
                      placeholder={t.enterQuantity}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t.amount}</Label>
                    <Input
                      type="number"
                      placeholder={t.enterAgreedPrice}
                      value={agreedPrice}
                      onChange={(e) => setAgreedPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.dueDate}</Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="space-y-2">
  <Label>IMEI Numbers (comma separated)</Label>
  <Input
    placeholder="356789112233445, 356789112233446"
    value={selectedImeis.join(',')}
    onChange={(e) =>
      setSelectedImeis(
        e.target.value
          .split(',')
          .map(v => v.trim())
          .filter(Boolean)
      )
    }
  />
</div>

            {/* Step 3: Confirm Details */}
            {currentStep === 3 && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase mb-1">
                      {t.counterparty}
                    </div>
                    <div className="text-sm font-medium text-[#1A1A1A]">
                      {selectedShopkeeper}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase mb-1">
                      {t.product}
                    </div>
                    <div className="text-sm font-medium text-[#1A1A1A]">
                      {selectedProduct}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase mb-1">
                      {t.quantity}
                    </div>
                    <div className="text-sm font-medium text-[#1A1A1A]">
                      {quantity} units
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase mb-1">
                      {t.amount}
                    </div>
                    <div className="text-sm font-medium text-[#1A1A1A]">
                      ₨{parseInt(agreedPrice || '0').toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase mb-1">
                      {t.dueDate}
                    </div>
                    {selectedImeis.length > 0 && (
  <div className="col-span-2 mt-2">
    <div className="text-xs font-medium text-[#8A8A8A] uppercase mb-1">
      IMEI
    </div>
    <div className="text-sm font-mono text-[#1A1A1A]">
      {selectedImeis.join(', ')}
    </div>
  </div>
)}

                    <div className="text-sm font-medium text-[#1A1A1A]">
                      {dueDate ? new Date(dueDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : '-'}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800">
                    {language === 'en' 
                      ? '✓ Stock will be deducted from inventory\n✓ Credit entry will be created\n✓ Notification will be sent to the shopkeeper'
                      : '✓ اسٹاک انوینٹری سے کم ہو جائے گا\n✓ قرض کی اندراج بن جائے گی\n✓ دکاندار کو نوٹیفکیشن بھیجی جائے گی'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {currentStep > 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                {t.back}
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsLendDialogOpen(false)}>
              {t.cancel}
            </Button>
            {currentStep < 3 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
                className="bg-[#1A73E8] hover:bg-[#1557b0] text-white disabled:opacity-50"
              >
                {t.next}
              </Button>
          ) : (
  <Button onClick={handleConfirmLend} 
          className="bg-[#1A73E8] hover:bg-[#1557b0] text-white">
    {t.confirm}
  </Button>
)}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Shopkeeper Directory Dialog */}
      <Dialog open={isDirectoryOpen} onOpenChange={setIsDirectoryOpen}>
        <DialogContent className="max-w-[75vw] w-[calc(100vw-2rem)] h-[80vh] max-h-[calc(100vh-4rem)] p-6">
          <ShopkeeperDirectory
            language={language}
            shopkeepers={shopkeepers}
            onShopkeepersChange={setShopkeepers}
            onClose={() => setIsDirectoryOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}