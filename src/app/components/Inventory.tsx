import { useState } from 'react';
import { Plus, Search, Edit, Eye, EyeOff, Trash2, Upload, Package, List } from 'lucide-react';
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
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Textarea } from '@/app/components/ui/textarea';
import { ImeiInput } from '@/app/components/inventory/ImeiInput';

interface InventoryProps {
  language: 'en' | 'ur';
}

interface Product {
  id: string;
  image: string;
  brand: string;
  model: string;
  variant: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  isPublic: boolean;
  imeis: string[];
}

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1592286927505-2fd6c3d2d2c8?w=100&h=100&fit=crop',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    variant: '256GB Black',
    quantity: 12,
    costPrice: 285000,
    sellingPrice: 315000,
    isPublic: true,
    imeis: ['123456789012345', '123456789012346'],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    variant: '512GB Gray',
    quantity: 8,
    costPrice: 245000,
    sellingPrice: 275000,
    isPublic: true,
    imeis: ['123456789012347', '123456789012348'],
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop',
    brand: 'Xiaomi',
    model: '14 Pro',
    variant: '256GB White',
    quantity: 15,
    costPrice: 135000,
    sellingPrice: 152000,
    isPublic: false,
    imeis: ['123456789012349', '123456789012350'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    variant: '128GB Obsidian',
    quantity: 5,
    costPrice: 185000,
    sellingPrice: 208000,
    isPublic: true,
    imeis: ['123456789012351', '123456789012352'],
  },
];

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Google', 'OnePlus', 'Oppo', 'Vivo', 'Realme'];
const models: Record<string, string[]> = {
  Apple: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro'],
  Samsung: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 5'],
  Xiaomi: ['14 Pro', '14', '13T Pro', 'Redmi Note 13 Pro'],
  Google: ['Pixel 8 Pro', 'Pixel 8', 'Pixel 7a'],
};

const mockSpecs = {
  ram: '12GB',
  rom: '256GB',
  camera: '48MP + 12MP + 12MP',
  battery: '4422mAh',
  display: '6.1" Super Retina XDR',
  processor: 'A17 Pro',
};

export function Inventory({ language }: InventoryProps) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  // Add product form state
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [variant, setVariant] = useState('');
  const [quantity, setQuantity] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [imeis, setImeis] = useState<string[]>([]);

  const t = {
    inventory: language === 'en' ? 'Inventory Management' : 'انوینٹری کا انتظام',
    addProduct: language === 'en' ? 'Add Product' : 'پروڈکٹ شامل کریں',
    search: language === 'en' ? 'Search inventory...' : 'انوینٹری تلاش کریں...',
    image: language === 'en' ? 'Image' : 'تصویر',
    brand: language === 'en' ? 'Brand' : 'برانڈ',
    model: language === 'en' ? 'Model' : 'ماڈل',
    variant: language === 'en' ? 'Variant' : 'ویرینٹ',
    quantity: language === 'en' ? 'Quantity' : 'مقدار',
    sellingPrice: language === 'en' ? 'Selling Price' : 'فروخت کی قیمت',
    visibility: language === 'en' ? 'Visibility' : 'مرئیت',
    actions: language === 'en' ? 'Actions' : 'اقدامات',
    public: language === 'en' ? 'Public' : 'عوامی',
    private: language === 'en' ? 'Private' : 'نجی',
    edit: language === 'en' ? 'Edit' : 'ترمیم',
    delete: language === 'en' ? 'Delete' : 'حذف کریں',
    noProducts: language === 'en' ? 'No products found' : 'کوئی پروڈکٹ نہیں ملا',
    addYourFirst: language === 'en' ? 'Add your first product to get started' : 'شروع کرنے کے لیے اپنی پہلی پروڈکٹ شامل کریں',
    
    // Add product dialog
    step1: language === 'en' ? 'Step 1: Product Lookup' : 'مرحلہ 1: پروڈکٹ تلاش',
    step2: language === 'en' ? 'Step 2: Auto-Filled Specs' : 'مرحلہ 2: خودکار تفصیلات',
    step3: language === 'en' ? 'Step 3: Your Details' : 'مرحلہ 3: آپ کی تفصیلات',
    selectBrand: language === 'en' ? 'Select Brand' : 'برانڈ منتخب کریں',
    selectModel: language === 'en' ? 'Select Model' : 'ماڈل منتخب کریں',
    enterVariant: language === 'en' ? 'Enter variant (e.g., 256GB Black)' : 'ویرینٹ درج کریں (مثال: 256GB Black)',
    next: language === 'en' ? 'Next' : 'اگلا',
    back: language === 'en' ? 'Back' : 'واپس',
    cancel: language === 'en' ? 'Cancel' : 'منسوخ کریں',
    save: language === 'en' ? 'Save Product' : 'پروڈکٹ محفوظ کریں',
    ram: language === 'en' ? 'RAM' : 'ریم',
    rom: language === 'en' ? 'Storage' : 'اسٹوریج',
    camera: language === 'en' ? 'Camera' : 'کیمرہ',
    battery: language === 'en' ? 'Battery' : 'بیٹری',
    display: language === 'en' ? 'Display' : 'ڈسپلے',
    processor: language === 'en' ? 'Processor' : 'پروسیسر',
    costPrice: language === 'en' ? 'Cost Price' : 'لاگت',
    enterCostPrice: language === 'en' ? 'Enter cost price' : 'لاگت درج کریں',
    enterSellingPrice: language === 'en' ? 'Enter selling price' : 'فروخت کی قیمت درج کریں',
    enterQuantity: language === 'en' ? 'Enter quantity' : 'مقدار درج کریں',
    makePublic: language === 'en' ? 'Make this product public' : 'اس پروڈکٹ کو عوامی بنائیں',
    uploadImages: language === 'en' ? 'Upload Images' : 'تصاویر اپ لوڈ کریں',
    uploadHint: language === 'en' ? 'Upload multiple product images' : 'متعدد پروڈکٹ کی تصاویر اپ لوڈ کریں',
    imeis: language === 'en' ? 'IMEIs' : 'ایمئائی ایس',
    enterImeis: language === 'en' ? 'Enter IMEIs' : 'ایمئائی ایس درج کریں',
  };

  const filteredProducts = products.filter((product) =>
    `${product.brand} ${product.model} ${product.variant}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const toggleVisibility = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isPublic: !p.isPublic } : p
    ));
  };

  const handleAddProduct = () => {
    // Reset form and open dialog
    setCurrentStep(1);
    setSelectedBrand('');
    setSelectedModel('');
    setVariant('');
    setQuantity('');
    setCostPrice('');
    setSellingPrice('');
    setIsPublic(true);
    setImeis([]);
    setIsAddDialogOpen(true);
  };

  const handleSaveProduct = () => {
    // Add new product to list
    const newProduct: Product = {
      id: String(products.length + 1),
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop',
      brand: selectedBrand,
      model: selectedModel,
      variant: variant,
      quantity: parseInt(quantity),
      costPrice: parseInt(costPrice),
      sellingPrice: parseInt(sellingPrice),
      isPublic: isPublic,
      imeis: imeis,
    };
    setProducts([newProduct, ...products]);
    setIsAddDialogOpen(false);
  };

  const canProceedStep1 = selectedBrand && selectedModel && variant;
  const canProceedStep3 = quantity && costPrice && sellingPrice;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleAddProduct} className="bg-[#1A73E8] hover:bg-[#1557b0] text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t.addProduct}
        </Button>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{t.noProducts}</h3>
          <p className="text-sm text-[#8A8A8A] mb-6">{t.addYourFirst}</p>
          <Button onClick={handleAddProduct} className="bg-[#1A73E8] hover:bg-[#1557b0] text-white">
            <Plus className="w-4 h-4 mr-2" />
            {t.addProduct}
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200 hover:bg-transparent">
                <TableHead className="text-[#4A4A4A] font-medium">{t.image}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.brand} / {t.model}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.variant}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.quantity}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.sellingPrice}</TableHead>
                <TableHead className="text-[#4A4A4A] font-medium">{t.visibility}</TableHead>
                <TableHead className="text-right text-[#4A4A4A] font-medium">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.model}
                      className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-[#1A1A1A]">{product.brand}</div>
                    <div className="text-sm text-[#8A8A8A]">{product.model}</div>
                  </TableCell>
                  <TableCell className="text-sm text-[#4A4A4A]">
                    {product.variant}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.quantity < 5 ? 'destructive' : 'secondary'}
                      className={`font-medium ${product.quantity < 5 ? '' : ''}`}
                    >
                      {product.quantity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-[#1A1A1A]">
                    ₨{product.sellingPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                        variant={product.isPublic ? 'default' : 'secondary'}
                        className={product.isPublic ? 'bg-[#1A73E8] text-white' : ''}
                    >
                      {product.isPublic ? t.public : t.private}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleVisibility(product.id)}
                        className="text-[#8A8A8A] hover:text-[#1A1A1A]"
                      >
                        {product.isPublic ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-[#8A8A8A] hover:text-[#1A1A1A]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.addProduct}</DialogTitle>
            <DialogDescription>
              {currentStep === 1 && t.step1}
              {currentStep === 2 && t.step2}
              {currentStep === 3 && t.step3}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Step 1: Product Lookup */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label>{t.brand}</Label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectBrand} />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.model}</Label>
                  <Select 
                    value={selectedModel} 
                    onValueChange={setSelectedModel}
                    disabled={!selectedBrand}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectModel} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedBrand && models[selectedBrand]?.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.variant}</Label>
                  <Input
                    placeholder={t.enterVariant}
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Step 2: Auto-Filled Specs (Read-Only) */}
            {currentStep === 2 && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase">{t.ram}</div>
                    <div className="text-sm font-medium text-[#1A1A1A] mt-1">{mockSpecs.ram}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase">{t.rom}</div>
                    <div className="text-sm font-medium text-[#1A1A1A] mt-1">{mockSpecs.rom}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase">{t.camera}</div>
                    <div className="text-sm font-medium text-[#1A1A1A] mt-1">{mockSpecs.camera}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase">{t.battery}</div>
                    <div className="text-sm font-medium text-[#1A1A1A] mt-1">{mockSpecs.battery}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase">{t.display}</div>
                    <div className="text-sm font-medium text-[#1A1A1A] mt-1">{mockSpecs.display}</div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#8A8A8A] uppercase">{t.processor}</div>
                    <div className="text-sm font-medium text-[#1A1A1A] mt-1">{mockSpecs.processor}</div>
                  </div>
                </div>
                <p className="text-xs text-[#8A8A8A] mt-3">
                  {language === 'en' 
                    ? 'These specifications are automatically fetched from GSMArena and stored as JSON.'
                    : 'یہ تفصیلات خودکار طور پر GSMArena سے حاصل کی گئی ہیں اور JSON کے طور پر محفوظ ہیں۔'}
                </p>
              </div>
            )}

            {/* Step 3: Seller Inputs */}
            {currentStep === 3 && (
              <>
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
                    <Label>{t.costPrice}</Label>
                    <Input
                      type="number"
                      placeholder={t.enterCostPrice}
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.sellingPrice}</Label>
                  <Input
                    type="number"
                    placeholder={t.enterSellingPrice}
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t.uploadImages}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200 cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-[#4A4A4A]">{t.uploadHint}</p>
                    <p className="text-xs text-[#8A8A8A] mt-1">
                      {language === 'en' ? 'Click to upload or drag and drop' : 'اپ لوڈ کرنے کے لیے کلک کریں یا ڈریگ اینڈ ڈراپ کریں'}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t.imeis}</Label>
                  <ImeiInput
                    language={language}
                    imeis={imeis}
                    onImeisChange={setImeis}
                    existingImeis={products.flatMap(p => p.imeis)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public" className="cursor-pointer">
                    {t.makePublic}
                  </Label>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            {currentStep > 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                {t.back}
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t.cancel}
            </Button>
            {currentStep < 3 ? (
              <Button 
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={currentStep === 1 && !canProceedStep1}
                className="bg-[#1A73E8] hover:bg-[#1557b0] text-white disabled:opacity-50"
              >
                {t.next}
              </Button>
            ) : (
              <Button 
                onClick={handleSaveProduct}
                disabled={!canProceedStep3}
                className="bg-[#1A73E8] hover:bg-[#1557b0] text-white disabled:opacity-50"
              >
                {t.save}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}