import { useState } from 'react';
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

interface SystemLogsProps {
  language: 'en' | 'ur';
}

interface Log {
  id: string;
  timestamp: string;
  eventType: 'user' | 'subscription' | 'shop' | 'system' | 'payment';
  description: string;
}

const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: '2026-01-28 14:32:18',
    eventType: 'user',
    description: 'New user registered: ahmed.khan@example.com',
  },
  {
    id: '2',
    timestamp: '2026-01-28 14:28:45',
    eventType: 'subscription',
    description: 'Subscription upgraded to Premium by muhammad.ali@example.com',
  },
  {
    id: '3',
    timestamp: '2026-01-28 14:15:32',
    eventType: 'shop',
    description: 'Shop "Tech Haven" published by ahmed.khan@example.com',
  },
  {
    id: '4',
    timestamp: '2026-01-28 14:08:19',
    eventType: 'payment',
    description: 'Payment received: $49.99 from muhammad.ali@example.com',
  },
  {
    id: '5',
    timestamp: '2026-01-28 13:54:07',
    eventType: 'user',
    description: 'User banned: spam.user@example.com',
  },
  {
    id: '6',
    timestamp: '2026-01-28 13:42:33',
    eventType: 'system',
    description: 'Database backup completed successfully',
  },
  {
    id: '7',
    timestamp: '2026-01-28 13:28:54',
    eventType: 'subscription',
    description: 'Subscription cancelled by fatima.hassan@example.com',
  },
  {
    id: '8',
    timestamp: '2026-01-28 13:15:21',
    eventType: 'shop',
    description: 'Shop "Mobile World" settings updated',
  },
  {
    id: '9',
    timestamp: '2026-01-28 12:58:42',
    eventType: 'payment',
    description: 'Payment failed for bilal.ahmed@example.com',
  },
  {
    id: '10',
    timestamp: '2026-01-28 12:43:16',
    eventType: 'user',
    description: 'Password reset requested by aisha.qureshi@example.com',
  },
  {
    id: '11',
    timestamp: '2026-01-28 12:28:59',
    eventType: 'system',
    description: 'System maintenance scheduled for 2026-01-29 02:00 UTC',
  },
  {
    id: '12',
    timestamp: '2026-01-28 12:12:37',
    eventType: 'subscription',
    description: 'New subscription: Enterprise plan by usman.sheikh@example.com',
  },
];

export function SystemLogs({ language }: SystemLogsProps) {
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  const text = {
    en: {
      filters: 'Filters',
      eventType: 'Event Type',
      all: 'All',
      user: 'User',
      subscription: 'Subscription',
      shop: 'Shop',
      system: 'System',
      payment: 'Payment',
      timestamp: 'Timestamp',
      description: 'Description',
      noLogs: 'No logs found',
      showing: 'Showing',
      of: 'of',
      logs: 'logs',
    },
    ur: {
      filters: 'فلٹرز',
      eventType: 'ایونٹ کی قسم',
      all: 'سب',
      user: 'صارف',
      subscription: 'سبسکرپشن',
      shop: 'دکان',
      system: 'سسٹم',
      payment: 'ادائیگی',
      timestamp: 'وقت کی مہر',
      description: 'تفصیل',
      noLogs: 'کوئی لاگ نہیں ملا',
      showing: 'دکھا رہے ہیں',
      of: 'میں سے',
      logs: 'لاگز',
    },
  };

  const t = text[language];

  const filteredLogs = mockLogs.filter((log) => {
    if (eventTypeFilter !== 'all' && log.eventType !== eventTypeFilter) return false;
    return true;
  });

  const getEventTypeBadgeColor = (eventType: string) => {
    switch (eventType) {
      case 'user':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'subscription':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'shop':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'system':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'payment':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case 'user':
        return t.user;
      case 'subscription':
        return t.subscription;
      case 'shop':
        return t.shop;
      case 'system':
        return t.system;
      case 'payment':
        return t.payment;
      default:
        return eventType;
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <span className="text-sm font-medium text-[#4A4A4A]">{t.filters}:</span>
        
        <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t.eventType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            <SelectItem value="user">{t.user}</SelectItem>
            <SelectItem value="subscription">{t.subscription}</SelectItem>
            <SelectItem value="shop">{t.shop}</SelectItem>
            <SelectItem value="system">{t.system}</SelectItem>
            <SelectItem value="payment">{t.payment}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold w-[200px] text-[#4A4A4A]">{t.timestamp}</TableHead>
              <TableHead className="font-semibold w-[180px] text-[#4A4A4A]">{t.eventType}</TableHead>
              <TableHead className="font-semibold text-[#4A4A4A]">{t.description}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-[#8A8A8A]">
                  {t.noLogs}
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <TableCell className="font-mono text-sm text-[#4A4A4A]">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getEventTypeBadgeColor(log.eventType)}>
                      {getEventTypeLabel(log.eventType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-[#1A1A1A]">{log.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8A8A8A]">
          {language === 'en'
            ? `${t.showing} ${filteredLogs.length} ${t.of} ${mockLogs.length} ${t.logs}`
            : `${mockLogs.length} ${t.of} ${filteredLogs.length} ${t.logs} ${t.showing}`}
        </p>
      </div>
    </div>
  );
}
