import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { History, MapPin, Clock, Camera, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock history data
const HISTORY_ITEMS = [
  {
    id: '1',
    date: 'Сегодня',
    items: [
      {
        id: 'h1',
        type: 'check_in',
        time: '07:55',
        object: 'ЖК "Северная Звезда"',
        zone: 'Блок А, этаж 5',
      },
      {
        id: 'h2',
        type: 'zone_change',
        time: '10:30',
        object: 'ЖК "Северная Звезда"',
        zone: 'Блок А, этаж 4',
        fromZone: 'Блок А, этаж 5',
      },
      {
        id: 'h3',
        type: 'report',
        time: '12:15',
        object: 'ЖК "Северная Звезда"',
        reportType: 'progress',
        status: 'approved',
      },
    ],
  },
  {
    id: '2',
    date: 'Вчера',
    items: [
      {
        id: 'h4',
        type: 'check_in',
        time: '08:02',
        object: 'ЖК "Северная Звезда"',
        zone: 'Блок Б, этаж 2',
      },
      {
        id: 'h5',
        type: 'report',
        time: '14:45',
        object: 'ЖК "Северная Звезда"',
        reportType: 'completion',
        status: 'approved',
      },
      {
        id: 'h6',
        type: 'check_out',
        time: '17:05',
        object: 'ЖК "Северная Звезда"',
      },
    ],
  },
];

const ITEM_TYPE_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  check_in: { label: 'Прибытие', icon: MapPin, color: 'text-success' },
  check_out: { label: 'Убытие', icon: MapPin, color: 'text-muted-foreground' },
  zone_change: { label: 'Смена зоны', icon: MapPin, color: 'text-info' },
  report: { label: 'Отчёт', icon: Camera, color: 'text-accent' },
};

export default function WorkerHistory() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<History className="h-5 w-5" />}
        title="История"
        subtitle="Ваши отметки и отчёты"
      />

      {HISTORY_ITEMS.length === 0 ? (
        <EmptyState
          icon={<Calendar className="h-12 w-12" />}
          title="История пуста"
          description="Здесь появятся ваши отметки и отчёты"
        />
      ) : (
        <div className="space-y-6">
          {HISTORY_ITEMS.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {group.date}
              </h3>
              <div className="space-y-2">
                {group.items.map((item, index) => {
                  const config = ITEM_TYPE_CONFIG[item.type];
                  const Icon = config.icon;

                  return (
                    <Card key={item.id} className="card-interactive">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div className={cn('p-2 rounded-full bg-muted', config.color)}>
                              <Icon className="h-4 w-4" />
                            </div>
                            {index < group.items.length - 1 && (
                              <div className="w-0.5 h-full bg-border mt-2 min-h-[20px]" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium text-sm">{config.label}</span>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {item.time}
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mt-0.5">
                              {item.object}
                            </p>

                            {'zone' in item && item.zone && (
                              <p className="text-xs text-muted-foreground">
                                {item.type === 'zone_change' && 'fromZone' in item
                                  ? `${item.fromZone} → ${item.zone}`
                                  : item.zone}
                              </p>
                            )}

                            {item.type === 'report' && 'status' in item && (
                              <div className="mt-2">
                                <StatusBadge
                                  type="assignment"
                                  status={item.status === 'approved' ? 'on_object' : 'assigned'}
                                />
                              </div>
                            )}
                          </div>

                          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
