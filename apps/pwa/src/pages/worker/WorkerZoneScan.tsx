import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, QrCode, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const ZONES = [
  { id: 'z1', name: 'Блок А, этаж 5', type: 'work', isCurrent: true, enteredAt: '08:15' },
  { id: 'z2', name: 'Блок А, этаж 4', type: 'work', isCurrent: false },
  { id: 'z3', name: 'Склад материалов', type: 'storage', isCurrent: false },
  { id: 'z4', name: 'Бытовка', type: 'break', isCurrent: false },
];

const ZONE_TYPE_LABELS: Record<string, { label: string; class: string }> = {
  work: { label: 'Рабочая', class: 'bg-info/15 text-info' },
  storage: { label: 'Склад', class: 'bg-warning/15 text-warning' },
  break: { label: 'Перерыв', class: 'bg-muted text-muted-foreground' },
  restricted: { label: 'Ограничено', class: 'bg-destructive/15 text-destructive' },
};

export default function WorkerZoneScan() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const currentZone = ZONES.find((z) => z.isCurrent);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        icon={<MapPin className="h-5 w-5" />}
        title="Зона"
        subtitle="Смена рабочей зоны на объекте"
      />

      {/* Current Zone */}
      {currentZone && (
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Текущая зона
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold">{currentZone.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={cn('text-xs px-2 py-0.5 rounded-full', ZONE_TYPE_LABELS[currentZone.type].class)}>
                      {ZONE_TYPE_LABELS[currentZone.type].label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>с {currentZone.enteredAt}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone List */}
      <div>
        <h3 className="text-sm font-medium mb-3">Доступные зоны</h3>
        <div className="space-y-2">
          {ZONES.filter((z) => !z.isCurrent).map((zone) => (
            <Card
              key={zone.id}
              className={cn(
                'cursor-pointer transition-all card-interactive',
                selectedZone === zone.id && 'ring-2 ring-accent border-accent'
              )}
              onClick={() => setSelectedZone(zone.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{zone.name}</p>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full', ZONE_TYPE_LABELS[zone.type].class)}>
                        {ZONE_TYPE_LABELS[zone.type].label}
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 transition-colors',
                      selectedZone === zone.id
                        ? 'border-accent bg-accent'
                        : 'border-muted-foreground/30'
                    )}
                  >
                    {selectedZone === zone.id && (
                      <CheckCircle2 className="h-full w-full text-accent-foreground" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          variant="scan"
          size="xl"
          className="w-full"
          disabled={!selectedZone}
        >
          <QrCode className="h-5 w-5" />
          Сканировать QR зоны
        </Button>
      </div>
    </div>
  );
}
