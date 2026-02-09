import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Phone, MapPin, AlertCircle, Building2, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';

export interface Shopkeeper {
  id: string;
  name: string;
  city: string;
  contact: string;
  notes?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface ShopkeeperDirectoryProps {
  language: 'en' | 'ur';
  shopkeepers: Shopkeeper[];
  onShopkeepersChange: (shopkeepers: Shopkeeper[]) => void;
  onClose: () => void;
}

export function ShopkeeperDirectory({
  language,
  shopkeepers,
  onShopkeepersChange,
  onClose,
}: ShopkeeperDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingShopkeeper, setEditingShopkeeper] = useState<Shopkeeper | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; shopkeeper: Shopkeeper | null }>({
    isOpen: false,
    shopkeeper: null,
  });
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formErrors, setFormErrors] = useState<{ name?: string; city?: string; contact?: string }>({});

  const t = {
    title: language === 'en' ? 'Manage Shopkeepers' : 'دکانداروں کا انتظام',
    description: language === 'en' 
      ? 'Manage your shopkeeper network for credit transactions' 
      : 'قرض کی لین دین کے لیے اپنے دکانداروں کا نیٹ ورک منظم کریں',
    search: language === 'en' ? 'Search by name, city, or phone...' : 'نام، شہر یا فون سے تلاش کریں...',
    addShopkeeper: language === 'en' ? 'Add Shopkeeper' : 'دکاندار شامل کریں',
    editShopkeeper: language === 'en' ? 'Edit Shopkeeper' : 'دکاندار میں ترمیم کریں',
    shopName: language === 'en' ? 'Shop Name' : 'دکان کا نام',
    city: language === 'en' ? 'City' : 'شہر',
    contact: language === 'en' ? 'Contact / WhatsApp' : 'رابطہ / واٹس ایپ',
    notes: language === 'en' ? 'Notes (Optional)' : 'نوٹس (اختیاری)',
    status: language === 'en' ? 'Status' : 'حالت',
    actions: language === 'en' ? 'Actions' : 'اقدامات',
    active: language === 'en' ? 'Active' : 'فعال',
    inactive: language === 'en' ? 'Inactive' : 'غیر فعال',
    save: language === 'en' ? 'Save' : 'محفوظ کریں',
    cancel: language === 'en' ? 'Cancel' : 'منسوخ کریں',
    close: language === 'en' ? 'Close' : 'بند کریں',
    noShopkeepers: language === 'en' ? 'No shopkeepers found' : 'کوئی دکاندار نہیں ملا',
    emptyStateTitle: language === 'en' ? 'No Shopkeepers Yet' : 'ابھی کوئی دکاندار نہیں',
    emptyStateDescription: language === 'en' 
      ? 'Add your first shopkeeper to start managing credit transactions' 
      : 'قرض کی لین دین کا انتظام شروع کرنے کے لیے اپنا پہلا دکاندار شامل کریں',
    enterShopName: language === 'en' ? 'e.g., Ali Mobile Shop' : 'مثال: علی موبائل شاپ',
    enterCity: language === 'en' ? 'e.g., Karachi' : 'مثال: کراچی',
    enterContact: language === 'en' ? 'e.g., +92 300 1234567' : 'مثال: +92 300 1234567',
    enterNotes: language === 'en' ? 'Optional notes about this shopkeeper...' : 'اس دکاندار کے بارے میں اختیاری نوٹس...',
    removeShopkeeper: language === 'en' ? 'Remove Shopkeeper' : 'دکاندار ہٹائیں',
    removeConfirmMessage: language === 'en'
      ? 'Are you sure you want to remove this shopkeeper? This action cannot be undone.'
      : 'کیا آپ واقعی اس دکاندار کو ہٹانا چاہتے ہیں؟ یہ عمل واپس نہیں کیا جا سکتا۔',
    remove: language === 'en' ? 'Remove' : 'ہٹائیں',
    addDescription: language === 'en'
      ? 'Add a new shopkeeper to your network. They will be available for credit transactions.'
      : 'اپنے نیٹ ورک میں نیا دکاندار شامل کریں۔ وہ قرض کی لین دین کے لیے دستیاب ہوں گے۔',
    editDescription: language === 'en'
      ? 'Update shopkeeper details. Changes will be reflected in all credit transactions.'
      : 'دکاندار کی تفصیلات اپ ڈیٹ کریں۔ تبدیلیاں تمام قرض کی لین دین میں نظر آئیں گی۔',
    createdOn: language === 'en' ? 'Added on' : 'شامل کیا گیا',
    edit: language === 'en' ? 'Edit' : 'ترمیم',
    delete: language === 'en' ? 'Delete' : 'حذف کریں',
    shopkeepersCount: language === 'en' ? 'shopkeepers' : 'دکاندار',
    required: language === 'en' ? 'Required' : 'ضروری',
  };

  const filteredShopkeepers = shopkeepers.filter((shop) =>
    `${shop.name} ${shop.city} ${shop.contact}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingShopkeeper(null);
    setFormName('');
    setFormCity('');
    setFormContact('');
    setFormNotes('');
    setFormErrors({});
    setIsAddDialogOpen(true);
  };

  const handleOpenEdit = (shopkeeper: Shopkeeper) => {
    setEditingShopkeeper(shopkeeper);
    setFormName(shopkeeper.name);
    setFormCity(shopkeeper.city);
    setFormContact(shopkeeper.contact);
    setFormNotes(shopkeeper.notes || '');
    setFormErrors({});
    setIsAddDialogOpen(true);
  };

  const validateForm = () => {
    const errors: { name?: string; city?: string; contact?: string } = {};
    
    if (!formName.trim()) {
      errors.name = t.required;
    }
    
    if (!formCity.trim()) {
      errors.city = t.required;
    }
    
    if (!formContact.trim()) {
      errors.contact = t.required;
    } else if (formContact.length < 10) {
      errors.contact = language === 'en' ? 'Invalid phone number' : 'غلط فون نمبر';
    }
    
    // Check for duplicate name + city combination
    const isDuplicate = shopkeepers.some((s) => {
      if (editingShopkeeper && s.id === editingShopkeeper.id) {
        return false; // Skip current shopkeeper when editing
      }
      return s.name.toLowerCase() === formName.trim().toLowerCase() && 
             s.city.toLowerCase() === formCity.trim().toLowerCase();
    });
    
    if (isDuplicate) {
      errors.name = language === 'en' 
        ? 'Shopkeeper with this name and city already exists' 
        : 'اس نام اور شہر کے ساتھ دکاندار پہلے سے موجود ہے';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingShopkeeper) {
      // Edit existing
      onShopkeepersChange(
        shopkeepers.map((s) =>
          s.id === editingShopkeeper.id
            ? { ...s, name: formName.trim(), city: formCity.trim(), contact: formContact.trim(), notes: formNotes.trim() }
            : s
        )
      );
    } else {
      // Add new
      const newShopkeeper: Shopkeeper = {
        id: Date.now().toString(),
        name: formName.trim(),
        city: formCity.trim(),
        contact: formContact.trim(),
        notes: formNotes.trim(),
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      onShopkeepersChange([...shopkeepers, newShopkeeper]);
    }
    setIsAddDialogOpen(false);
  };

  const handleOpenDelete = (shopkeeper: Shopkeeper) => {
    setDeleteConfirmation({ isOpen: true, shopkeeper });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.shopkeeper) {
      onShopkeepersChange(shopkeepers.filter((s) => s.id !== deleteConfirmation.shopkeeper!.id));
    }
    setDeleteConfirmation({ isOpen: false, shopkeeper: null });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, shopkeeper: null });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 flex items-start justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">{t.title}</h2>
          <p className="text-sm text-[#8A8A8A]">{t.description}</p>
        </div>
        <Button onClick={onClose} variant="outline" className="flex-shrink-0 ml-4">
          {t.close}
        </Button>
      </div>

      {/* Search and Add Button - Fixed */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
        <Button onClick={handleOpenAdd} className="flex-shrink-0 bg-[#1A73E8] hover:bg-[#1557b0] text-white h-10">
          <Plus className="w-4 h-4 mr-2" />
          {t.addShopkeeper}
        </Button>
      </div>

      {/* Stats Bar */}
      {shopkeepers.length > 0 && (
        <div className="flex-shrink-0 mb-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">{shopkeepers.length}</span> {t.shopkeepersCount}
          </p>
        </div>
      )}

      {/* Cards Container - Scrollable */}
      <div className="flex-1 min-h-0 overflow-auto">
        {shopkeepers.length === 0 ? (
          // Empty State
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center max-w-md px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{t.emptyStateTitle}</h3>
              <p className="text-sm text-[#8A8A8A] mb-6">{t.emptyStateDescription}</p>
              <Button onClick={handleOpenAdd} className="bg-[#1A73E8] hover:bg-[#1557b0] text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t.addShopkeeper}
              </Button>
            </div>
          </div>
        ) : filteredShopkeepers.length === 0 ? (
          // No Search Results
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <div className="text-center max-w-md px-4">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-[#8A8A8A]">{t.noShopkeepers}</p>
            </div>
          </div>
        ) : (
          // Shopkeeper Cards Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            {filteredShopkeepers.map((shopkeeper) => (
              <div
                key={shopkeeper.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-semibold text-[#1A1A1A] text-base mb-1 truncate">
                      {shopkeeper.name}
                    </h3>
                    <Badge
                      variant={shopkeeper.status === 'active' ? 'default' : 'secondary'}
                      className={`${
                        shopkeeper.status === 'active'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } text-xs`}
                    >
                      {shopkeeper.status === 'active' ? t.active : t.inactive}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(shopkeeper)}
                      className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-[#1A73E8] transition-colors"
                      title={t.edit}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenDelete(shopkeeper)}
                      className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                      title={t.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{shopkeeper.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{shopkeeper.contact}</span>
                  </div>
                  {shopkeeper.notes && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-[#8A8A8A] line-clamp-2">{shopkeeper.notes}</p>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-[#8A8A8A]">
                    <Calendar className="w-3 h-3" />
                    <span>{t.createdOn}: {formatDate(shopkeeper.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Shopkeeper Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingShopkeeper ? t.editShopkeeper : t.addShopkeeper}</DialogTitle>
            <DialogDescription>
              {editingShopkeeper ? t.editDescription : t.addDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">{t.shopName}</Label>
              <Input
                id="shopName"
                placeholder={t.enterShopName}
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value);
                  setFormErrors({ ...formErrors, name: undefined });
                }}
                className={formErrors.name ? 'border-red-500' : ''}
              />
              {formErrors.name && (
                <p className="text-xs text-red-600">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t.city}</Label>
              <Input
                id="city"
                placeholder={t.enterCity}
                value={formCity}
                onChange={(e) => {
                  setFormCity(e.target.value);
                  setFormErrors({ ...formErrors, city: undefined });
                }}
                className={formErrors.city ? 'border-red-500' : ''}
              />
              {formErrors.city && (
                <p className="text-xs text-red-600">{formErrors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">{t.contact}</Label>
              <Input
                id="contact"
                placeholder={t.enterContact}
                value={formContact}
                onChange={(e) => {
                  setFormContact(e.target.value);
                  setFormErrors({ ...formErrors, contact: undefined });
                }}
                className={formErrors.contact ? 'border-red-500' : ''}
              />
              {formErrors.contact && (
                <p className="text-xs text-red-600">{formErrors.contact}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t.notes}</Label>
              <Textarea
                id="notes"
                placeholder={t.enterNotes}
                value={formNotes}
                onChange={(e) => setFormNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-[#1A73E8] hover:bg-[#1557b0] text-white"
            >
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Shopkeeper Confirmation Dialog */}
      <Dialog open={deleteConfirmation.isOpen} onOpenChange={(open) => !open && handleCancelDelete()}>
        <DialogContent className="max-w-md">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <DialogHeader className="p-0 space-y-1">
                <DialogTitle className="text-lg">{t.removeShopkeeper}</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  {t.removeConfirmMessage}
                </DialogDescription>
              </DialogHeader>
              {deleteConfirmation.shopkeeper && (
                <div className="mt-3 p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="font-medium text-sm text-[#1A1A1A]">{deleteConfirmation.shopkeeper.name}</p>
                  <p className="text-xs text-[#8A8A8A] mt-0.5">{deleteConfirmation.shopkeeper.city}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={handleCancelDelete} className="flex-1 sm:flex-initial">
              {t.cancel}
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-initial"
            >
              {t.remove}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
